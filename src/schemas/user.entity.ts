import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
// @Unique('UQ_email', ['email'], { where: 'email IS NOT NULL' })
// @Unique('UQ_phone', ['phone'], { where: 'phone IS NOT NULL' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;
}
