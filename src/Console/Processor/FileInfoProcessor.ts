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
      filePathInfo: Array<string>,
      filePathInfoLength: number,
      fullFilePath: string;

    if (errorDebug.stack) {
      callStackInFile = errorDebug.stack.split('\n')[6];
      callStackInFile
        .replace(/\s/, '')
        .replace(
          /\([^\s]*\)/,
          (substring, args) => filePath = substring.replace(/[()]/g, '')
        );
      filePathInfo = filePath.split(':');
      filePathInfoLength = filePathInfo.length;
      if (filePathInfoLength > 1) {
        fullFilePath = filePathInfo[filePathInfoLength - 3];
        fileInfo.line = parseInt(filePathInfo[filePathInfoLength - 2], 10);
        fileInfo.fileName = <string>fullFilePath.split('/').pop();
        fileInfo.fullFilePath = fullFilePath;
      }
    }

    return fileInfo;
  }

}

export default FileInfoProcessor;
