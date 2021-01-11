import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';

import { Base } from 'shared/base.entity';

@Entity()
export class User extends Base {
  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    const isPasswordValid = await bcrypt.compare(attempt, this.password);
    return isPasswordValid;
  }
}
