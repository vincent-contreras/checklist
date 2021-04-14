import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { ChecklistItemDto } from '../dto/checklist-item.dto'

@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}
  @Post()
  create(@Body() item: ChecklistItemDto): Promise<ChecklistItemDto> {
    return this.checklistItemsSvc.create(item);
  }

  @Get()
  getAll(): Promise<ChecklistItemDto[]> {
    return this.checklistItemsSvc.findAll();
  }
}
