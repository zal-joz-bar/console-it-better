import Processor from './Processor/Processor';

export default interface Settings {
  processors?: Array<Processor>;
  overrideConsole?: boolean;
  dataSeparator?:string;
}
