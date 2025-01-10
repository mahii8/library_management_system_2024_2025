import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  extractEmail(token: string): string {
    try {
      const decoded = this.jwtService.decode(token) as { email: string };
      if (!decoded || !decoded.email) {
        throw new UnauthorizedException('Email not found in token');
      }
      return decoded.email;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
