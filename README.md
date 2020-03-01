# console-it-better
> The best way to console log your data in CLI

Provide to your cli logs more information, such as:
 - Date timestamps
 - File name and line number
 - more in future :)

Easy configuration, backwards compatibility - will works on your old projects ;).

## Installation
```shell script
npm install console-it-better --save
```

## Configuration
The basic configuration for better logging is to add timestamp to your logs, and add file and line number of log.

```typescript
import {ConsoleItBetter, DateProcessor, FileInfoProcessor} from 'console-it-better';

new ConsoleItBetter(
  {
    overrideConsole: true,
    processors: [
      (new FileInfoProcessor()),
      (new DateProcessor()),
    ]
  },
);
```
 
If you are using flag overrideConsole and it is set to true you will override `console.log`, `console.warn`, `console.error` in all your code scope.
