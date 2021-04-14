import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ChecklistItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  item: string;
}
