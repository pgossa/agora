import { Injectable } from '@nestjs/common';

@Injectable()
export class SondageService {
  getHello(): string {
    return 'Hello World!';
  }
}
