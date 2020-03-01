import Settings from './Settings';

class ConsoleItBetter {
  protected consoleLog: any;

  protected consoleWarn: any;

  protected consoleError: any;

  protected settings: Settings;

  constructor(settings: Settings) {
    this.consoleLog = console.log;
    this.consoleWarn = console.warn;
    this.consoleError = console.error;
    this.settings = settings;
    this.setUp();
  }

  public log(...args: any[]) {
    this.runLog(args, this.consoleLog);
  }

  public warn(...args: any[]) {
    this.runLog(args, this.consoleWarn);
  }

  public error(...args: any[]) {
    this.runLog(args, this.consoleError);
  }

  protected setUp() {
    if (this.settings.overrideConsole) {
      console.log = this.log.bind(this);
      console.warn = this.warn.bind(this);
      console.error = this.error.bind(this);
    }
  }

  protected runLog(args: any[], provider: (data: any) => void) {
    let elements = [];
    for (let element of args) {
      if (typeof element === 'object') {
        element = JSON.stringify(element, null, '\t');
      }
      elements.push(element);
    }
    if (typeof this.settings.processors === 'object') {
      for (let processor of this.settings.processors) {
        processor.run();
        if (processor.isSuffix()) {
          elements.unshift(processor.getProcessedData());
        } else {
          elements.push(processor.getProcessedData());
        }
      }
    }
    let separator: string = ' ';
    if (this.settings.dataSeparator) {
      separator = this.settings.dataSeparator;
    }
    provider(elements.join(separator));
  }
}


export default ConsoleItBetter;
