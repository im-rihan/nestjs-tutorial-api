import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user-id' })
  id: number;

  @Column({ nullable: false, default: '' })
  username: string;

  @Column({
    name: 'email-address',
    nullable: true,
    default: '',
  })
  emailAddress: string;

  @Column({ nullable: false, default: '' })
  password: string;
}
