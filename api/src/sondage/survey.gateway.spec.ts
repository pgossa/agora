import { Test, TestingModule } from '@nestjs/testing';
import { SurveyGateway } from './survey.gateway';

describe('SurveyGateway', () => {
  let gateway: SurveyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyGateway],
    }).compile();

    gateway = module.get<SurveyGateway>(SurveyGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
