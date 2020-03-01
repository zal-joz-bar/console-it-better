import {Momentum} from './Momentum';

class BaseMiddleware {
  protected runMethod: ((args: Array<any>) => Array<any>) = (args => args);

  protected momentum: Momentum;

  constructor(momentum: Momentum = Momentum.AfterProcessors) {
    this.momentum = momentum;
  }

  getMomentum(): Momentum {
    return this.momentum;
  }

  run(args: Array<any>): Array<any> {
    return this.runMethod(args);
  }

  setRunMethod(runMethod: (args: Array<any>) => Array<any>): BaseMiddleware {
    this.runMethod = runMethod;
    return this;
  }

}

export default BaseMiddleware;
