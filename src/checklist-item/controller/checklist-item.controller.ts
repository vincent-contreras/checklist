import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { ChecklistItemDto } from '../dto/checklist-item.dto';

@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}
  @Post()
  async create(@Body() item: ChecklistItemDto): Promise<ChecklistItemDto> {
    return await this.checklistItemsSvc.create(item);
  }

  @Get()
  async getAll(): Promise<ChecklistItemDto[]> {
    return this.checklistItemsSvc.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<ChecklistItemDto> {
    return this.checklistItemsSvc.findOne({ id: id} );
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() item: ChecklistItemDto): Promise<ChecklistItemDto> {
    return this.checklistItemsSvc.updateOne(id, item.item);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id): Promise<ChecklistItemDto> {
    return this.checklistItemsSvc.deleteOne(id);
  }
}
