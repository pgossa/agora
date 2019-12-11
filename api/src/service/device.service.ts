import { Injectable, HttpException } from '@nestjs/common';
import { Logger } from '../service/logger.service';

@Injectable()
export class DeviceService {
  constructor (
    private readonly logger: Logger,
  ) {}

  returnJsonDataAndLog(url: string, method: string, httpCode: number, data: object): object {
    this.logger.log([
      `New request ${method} on ${url}`,
      `Status ${httpCode}`
    ]);
    return data;
  }

  throwExceptionAndLog(url: string, method: string, httpCode: number, message): HttpException {
    this.logger.error([
      `New request ${method} on ${url}`,
      `Error ${httpCode}`,
      message
    ], undefined);
    throw new HttpException(message, httpCode);
  }

  generateJsonMessage(message: string, httpCode: number): object {
    return {
      "statusCode": httpCode,
      "message": message
    };
  }
}
