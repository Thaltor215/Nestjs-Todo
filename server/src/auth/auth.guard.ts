import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException();
    }

    const encodedToken = authHeader.substring(6);
    const decodedToken = Buffer.from(encodedToken, 'base64').toString('utf-8');
    const [username, password] = decodedToken.split(':');

    if (username === 'testuser' && password === 'testpassword') {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
