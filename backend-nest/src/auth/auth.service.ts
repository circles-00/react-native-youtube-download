import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../models/user.entity';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  comparePasswords(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(email);
    if (user && this.comparePasswords(password, user.password)) {
      // Used to remove password from object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
