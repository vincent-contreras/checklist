import { BadRequestException, Injectable } from '@nestjs/common';
import { ChecklistItemDto } from '../../dto/checklist-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistItem } from '../../entity/checklist-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChecklistItemService {
  constructor(
    @InjectRepository(ChecklistItem)
    private readonly checklistRepository: Repository<ChecklistItem>,
  ) {}

  async create(item: ChecklistItemDto): Promise<ChecklistItemDto> {
    const newItem = this.checklistRepository.create(item);
    await this.checklistRepository.save(newItem);
    return newItem;
  }
  findAll(): Promise<ChecklistItemDto[]> {
    return this.checklistRepository.find();
  }
  findOne(id): Promise<ChecklistItemDto> {
    return this.checklistRepository.findOne(id);
  }
  async updateOne(updatedValue: ChecklistItemDto): Promise<ChecklistItem> {
    const { id } = updatedValue;
    await this.checklistRepository.update({ id }, updatedValue);
    const item = await this.checklistRepository.findOne(id);
    return item;
  }
  async deleteOne(id): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.checklistRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
