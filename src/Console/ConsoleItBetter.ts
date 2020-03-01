import Settings from './Settings';
import {Momentum} from './Middleware/Momentum';
import BaseMiddleware from './Middleware/BaseMiddleware';

class ConsoleItBetter {
  public static consoleLog: (...args: any[]) => void = args => {};

  public static consoleWarn: (...args: any[]) => void = args => {};

  public static consoleError: (...args: any[]) => void = args => {};

  protected settings: Settings;

  protected MiddlewareMap: Map<Momentum, Array<BaseMiddleware>>;

  constructor(settings: Settings = {}) {
    ConsoleItBetter.consoleLog = console.log;
    ConsoleItBetter.consoleWarn = console.warn;
    ConsoleItBetter.consoleError = console.error;
    this.MiddlewareMap = (new Map<Momentum, Array<BaseMiddleware>>());
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
    if (typeof this.settings.middleware === 'object') {
      for (let middleware of this.settings.middleware) {
        let currentMiddleMoment = this.MiddlewareMap.get(middleware.getMomentum());
        if (typeof currentMiddleMoment === 'undefined') {
          currentMiddleMoment = [];
        }
        currentMiddleMoment.push(middleware);
        this.MiddlewareMap.set(middleware.getMomentum(), currentMiddleMoment)
      }
    }
  }

  protected run(args: Array<any>, provider: (data: any) => void) {
    args = this.runMiddleware(Momentum.BeforeProcessors, args);
    args = this.runProcessors(args);
    args = this.runMiddleware(Momentum.AfterProcessors, args);
    args = this.runMiddleware(Momentum.BeforeLog, args);
    provider.apply(this, args);
    this.runMiddleware(Momentum.AfterLog, args);
  }

  private runMiddleware(momentum: Momentum, args: Array<any>): Array<any> {
    let middleToFire = this.MiddlewareMap.get(momentum) || [];
    for (let Middle of middleToFire) {
      args = Middle.run(args);
    }
    return args;
  }

  private runProcessors(args: Array<any>): Array<any> {
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
    return args;
  }

}


export default ConsoleItBetter;
