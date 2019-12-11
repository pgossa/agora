import { Injectable } from '@nestjs/common';
import { Logger } from '../service/logger.service';

@Injectable()
export class SondageMiddleware {
  constructor(
    private readonly logger: Logger
  ) {}

  use(req, res, next) {
    let body = JSON.stringify(req.body);
    this.logger.log([
      `New request POST on ${req.url}`,
      `Body of the request: ${body}`
    ]);
    next();
  }
}