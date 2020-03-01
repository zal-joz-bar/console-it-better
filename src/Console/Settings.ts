import Processor from './Processor/Processor';
import BaseMiddleware from './Middleware/BaseMiddleware';

export default interface Settings {
  processors?: Array<Processor>;
  middleware?: Array<BaseMiddleware>;
  overrideConsole?: boolean;
  dataSeparator?:string;
}
