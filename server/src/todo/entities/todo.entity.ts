import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title', nullable: false })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({ type: 'boolean', name: 'complete', nullable: true })
  complete: boolean;
}
