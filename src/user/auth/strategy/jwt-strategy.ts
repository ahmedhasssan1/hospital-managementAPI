import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
export interface Payload {
  sub: number;
  email: string;
  role:string;
  name:string
}

export interface AuthResult {
  userId: number;
  email: string;
}

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('SECRET_API');
    if (!secret) {
      throw new Error('SECRET_API environment variable is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  validate(payload: Payload) {
    return { userId: payload.sub, email: payload.email,role:payload.role,name:payload.name };
  }
}
