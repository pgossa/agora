import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SondageModule } from './sondage/sondage.module';
import { SondageMiddleware } from './sondage/sondage.middleware';
import { Logger } from './service/logger.service';

@Module({
    imports: [SondageModule],
    providers: [Logger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SondageMiddleware)
      .forRoutes({ path: 'sondage', method: RequestMethod.POST });
  }
}