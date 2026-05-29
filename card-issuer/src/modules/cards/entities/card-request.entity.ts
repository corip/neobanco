import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card_requests')
export class CardRequestEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  requestId!: string;

  @Column({
    unique: true,
  })
  documentNumber!: string;

  @Column()
  documentType!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;

  @Column()
  type!: string;

  @Column()
  currency!: string;

  @Column()
  status!: string;

  @Column({
    default: 0,
  })
  retries!: number;

  @Column({
    nullable: true,
  })
  errorReason?: string;
}