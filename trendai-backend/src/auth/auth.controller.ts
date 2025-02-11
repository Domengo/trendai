import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: { user: User },
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async findAllUsers(): Promise<User[]> {
    return this.authService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneUser(@Param('id') id: string): Promise<User> {
    const user = await this.authService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.authService.deleteUser(id);
  }
}
