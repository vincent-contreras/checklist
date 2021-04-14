import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChecklistItemModule } from './checklist-item/checklist-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ChecklistItemModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
