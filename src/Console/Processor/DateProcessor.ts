import moment from 'moment';
import Processor from './Processor';

class DateProcessor extends Processor {

  protected format: string;

  constructor(format: string = 'YYYY-MM-DD HH:mm:ss.SSS:') {
    super();
    this.format = format;
  }

  run(): Processor {
    this.processedData = moment().format();
    return this;
  }

  isSuffix(): boolean {
    return true;
  }

}

export default DateProcessor;
