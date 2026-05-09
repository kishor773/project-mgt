import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {}

  async generateToken(user: any) {

    return this.jwtService.sign({
      sub: user.id,
      email: user.email
    });
  }
}
