import Settings from './Settings';

class ConsoleItBetter {
  public static consoleLog: any;

  public static consoleWarn: any;

  public static consoleError: any;

  protected settings: Settings;

  constructor(settings: Settings) {
    ConsoleItBetter.consoleLog = console.log;
    ConsoleItBetter.consoleWarn = console.warn;
    ConsoleItBetter.consoleError = console.error;
    this.settings = settings;
    this.setUp();
  }

  public log(...args: any[]) {
    this.run(args, ConsoleItBetter.consoleLog);
  }

  public warn(...args: any[]) {
    this.run(args, ConsoleItBetter.consoleWarn);
  }

  public error(...args: any[]) {
    this.run(args, ConsoleItBetter.consoleError);
  }

  protected setUp() {
    if (this.settings.overrideConsole === true) {
      console.log = this.log.bind(this);
      console.warn = this.warn.bind(this);
      console.error = this.error.bind(this);
    }
    if (typeof this.settings.dataSeparator !== 'string') {
      this.settings.dataSeparator = ' ';
    }
  }

  protected run(args: Array<any>, provider: (data: any) => void) {
    if (typeof this.settings.processors === 'object') {
      for (let processor of this.settings.processors) {
        processor.run();
        if (processor.isSuffix()) {
          args.unshift(processor.getProcessedData());
        } else {
          args.push(processor.getProcessedData());
        }
      }
    }

    provider.apply(this, args);
  }

}


export default ConsoleItBetter;
