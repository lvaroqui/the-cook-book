import bcrypt from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 40,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    length: 30,
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    length: 60,
    nullable: false,
  })
  passwordHash!: string;

  static async create(email: string, username: string, password: string) {
    const user = new User();
    user.email = email;
    user.username = username;
    user.passwordHash = await bcrypt.hash(password, 12);
    return user;
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.passwordHash);
  }
}
