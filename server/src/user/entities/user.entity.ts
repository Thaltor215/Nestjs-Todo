import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'username',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', length: 255, name: 'firstname', nullable: false })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
    nullable: false,
    unique: true,
  })
  lastname: string;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password: string;
}
