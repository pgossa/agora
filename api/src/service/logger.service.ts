import { Logger as LoggerService } from '@nestjs/common';

export class Logger extends LoggerService {
  log(message: Array<string>|string) {
    if(typeof message === "string") {
      this.separator();
      super.log(message);
    } else {
      this.separator();
      message.forEach(element => {
        super.log(element);
      });
    }
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }

  separator() {
    super.log(`-----------------------------------`);
  }
}