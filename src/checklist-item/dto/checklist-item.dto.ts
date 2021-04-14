import { IsNumber, IsString } from 'class-validator';

export class ChecklistItemDto {
  @IsNumber()
  id: number;

  @IsString()
  item: string;
}
