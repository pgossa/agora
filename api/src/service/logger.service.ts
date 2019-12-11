import { Logger as LoggerService } from '@nestjs/common';

export class Logger extends LoggerService {
  log(message: Array<string>|string) {
    this.handlerMessage('log', message);
  }

  error(message: Array<string>, trace: string) {
    this.handlerMessage('error', message, trace);
  }

  warn(message: string) {
    this.handlerMessage('warn', message);
  }

  debug(message: string) {
    this.handlerMessage('debug', message);
  }

  verbose(message: string) {
    this.handlerMessage('verbose', message);
  }

  handlerMessage(action: string, message: Array<string>|string, trace?: string) {
    if (typeof message === "string") {
      super[action](message, trace);
    } else {
      this.separator();
      message.forEach(element => {
        super[action](element, trace);
      });
    }
  }

  separator() {
    super.verbose(`-----------------------------------`);
  }
}