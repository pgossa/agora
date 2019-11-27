import { IsString, IsInt } from 'class-validator';

export class CreateSondageDto {
  @IsString()
  readonly choice: string;

  @IsInt()
  readonly count: number;

  @IsString()
  readonly text: string;

  @IsString()
  readonly  id: string;
}