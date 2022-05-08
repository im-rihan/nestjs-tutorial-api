import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ nullable: false, default: '' })
  username: string;

  @Column({
    name: 'email',
    nullable: true,
    default: '',
  })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;
}
