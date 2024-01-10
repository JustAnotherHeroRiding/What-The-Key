import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { supabaseAdmin } from '../supabase.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  @Get('checkSession')
  @ApiBearerAuth() // Indicate that this endpoint requires Bearer token authorization
  @ApiOperation({
    summary: 'Check User Session',
    description: 'Checks the session of the user based on the provided token.',
  })
  @ApiResponse({ status: 200, description: 'User session details' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if the token is invalid or not provided',
  })
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get All Users',
    description: 'Retrieves a list of all users.',
  })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if the token is invalid',
  })
  async getAllUsers() {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return data;
  }
}
