import Processor from './Processor';

interface FileInfo {
  line: number;
  fileName: string;
  fullFilePath: string;
}

class FileInfoProcessor extends Processor {
  isSuffix(): boolean {
    return true;
  }

  run(): Processor {
    let fileInfo = FileInfoProcessor.getFileInfo();
    this.processedData = ['[',fileInfo.fileName, ':', fileInfo.line, ']'].join('');
    return this;
  }

  protected static getFileInfo(): FileInfo {
    let fileInfo: FileInfo = {
        line: 0,
        fileName: '',
        fullFilePath: '',
      },
      errorDebug: Error = new Error,
      callStackInFile: string,
      filePath: string = '',
      filePathInfo: Array<string>;

    if (errorDebug.stack) {
      callStackInFile = errorDebug.stack.split('\n')[5];
      callStackInFile
        .replace(/\s/, '')
        .replace(
          /\([^\s]*\)/,
          (substring, args) => filePath = substring.replace(/[()]/g, '')
        );
      filePathInfo = filePath.split(':');
      fileInfo.line = parseInt(filePathInfo[1], 10);
      fileInfo.fileName = <string>filePathInfo[0].split('/').pop();
      fileInfo.fullFilePath = filePathInfo[0];
    }

    return fileInfo;
  }

}

export default FileInfoProcessor;
