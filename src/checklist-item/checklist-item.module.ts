import { Module } from '@nestjs/common';
import { ChecklistItemController } from './controller/checklist-item.controller';
import { ChecklistItemService } from './service/checklist-item/checklist-item.service';
import { ChecklistItemEntity } from './entity/checklist-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [TypeOrmModule.forFeature([ChecklistItemEntity])],

  controllers: [ChecklistItemController],

  providers: [ChecklistItemService],
})
export class ChecklistItemModule {}
