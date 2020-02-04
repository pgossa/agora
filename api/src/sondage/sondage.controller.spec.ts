import { Test, TestingModule } from '@nestjs/testing';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';

describe('AppController', () => {
  let appController: SondageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SondageController],
      providers: [SondageService],
    }).compile();

    appController = app.get<SondageController>(SondageController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
