abstract class Processor {
  protected lastData: any;
  protected rawData: any;
  protected processedData: any;

  passData(lastData: any, rawData: any): Processor {
    this.lastData = lastData;
    this.rawData = rawData;

    return this;
  }

  getProcessedData(): any {
    return this.processedData;
  }

  abstract run(): Processor;

  abstract isSuffix(): boolean;

}

export default Processor;
