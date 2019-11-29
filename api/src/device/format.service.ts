import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatService {
  generateJsonMessage(message: string, httpCode: number): object {
    return {
      "statusCode": httpCode,
      "message": message
    };
  }
}
