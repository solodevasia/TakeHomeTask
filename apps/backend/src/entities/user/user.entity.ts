import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({
  name: 'user',
  schema: 'authenticates',
})
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  pic!: string;

  @Column()
  role: number = 0;

  @Column()
  created_at: Date = new Date();

  @BeforeInsert()
  beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
