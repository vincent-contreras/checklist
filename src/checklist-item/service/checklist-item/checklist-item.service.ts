import { BadRequestException, Injectable } from "@nestjs/common";
import { ChecklistItemDto } from '../../dto/checklist-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistItemEntity } from '../../entity/checklist-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChecklistItemService {
  constructor(
    @InjectRepository(ChecklistItemEntity)
    private checklistRepository: Repository<ChecklistItemEntity>,
  ) {}

  create(item: ChecklistItemDto): Promise<ChecklistItemDto> {
    // this.checklistItems.push(item);
    return this.checklistRepository.save(item);
  }
  findAll(): Promise<ChecklistItemDto[]> {
    return this.checklistRepository.find();
  }
  findOne(id): Promise<ChecklistItemDto> {
    return this.checklistRepository.findOne(id);
  }
  async updateOne(id, updatedValue): Promise<ChecklistItemDto> {
    let item: ChecklistItemDto = await this.checklistRepository.findOne(id);
    item.item = updatedValue;
    await this.checklistRepository.update(id, item);
    item = await this.checklistRepository.findOne(id);
    return item;
  }
  async deleteOne(id): Promise<ChecklistItemDto> {
    const item: ChecklistItemDto = await this.checklistRepository.findOne(id);
    if (!!item) {
      throw new BadRequestException('Item does not exist');
    }
    await this.checklistRepository.delete(id);
    return item;
  }
}
