import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  getToken(userEmail: string, userRole: string): string {
    return this.jwtService.sign({
      email: userEmail,
      role: userRole,
    });
  }

  async signup(dto: AuthDto): Promise<{ token: string }> {
    const { email, password, role } = dto;
    var usedBefore = await this.userModel.findOne({ email });

    if (usedBefore) {
      throw new BadRequestException('Duplicate email.');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        role,
      });
      return { token: this.getToken(email, role) };
    } catch (error) {
      console.log(error);
    }
  }
  async login(dto: AuthDto): Promise<{ token: string }> {
    const { email, password, role } = dto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.role != role) {
      throw new UnauthorizedException(
        'Wrong Role. Role not matched correctly.',
      );
    }

    const token = this.getToken(email, role);
    return { token: token };
  }
}
