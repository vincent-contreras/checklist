import { Injectable } from '@nestjs/common';
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
}
