import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { supabaseAdmin } from 'src/supabase.service';

@Controller('user')
export class UserController {
  @Get('checkSession')
  async getSession(@Req() request) {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    const { data: user, error } = await supabaseAdmin.auth.getUser(token);

    if (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  @Get('getAllUsers')
  async getAllUsers() {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return data;
  }
}
