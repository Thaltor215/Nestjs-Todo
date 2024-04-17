import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string, password: string): Promise<any> {
    if (username !== 'testuser' || password !== 'testpassword') {
      throw new UnauthorizedException();
    }

    const basicAuthToken = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );

    return {
      username: 'testuser',
      firstname: 'John',
      lastname: 'Doe',
      access_token: basicAuthToken,
    };
  }
}
