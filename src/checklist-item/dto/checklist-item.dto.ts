import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ChecklistItemDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  item: string;

  constructor(item: string, id: number) {
    this.item = item;
    this.id = id;
  }
}
