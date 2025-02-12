import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    await Promise.resolve();
    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
    });
    return newUser.save();
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<any> | null> {
    const user = await this.userModel.findOne({ email }).exec();
    await Promise.resolve();
    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };
    await Promise.resolve();
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user || undefined;
  }
}
