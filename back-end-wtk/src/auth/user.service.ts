import { Injectable } from '@nestjs/common';
import { supabaseAdmin } from '../supabase.service';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUserByEmail(email: string) {
    const { data, error } = await supabaseAdmin
      .from('auth.users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getProfile(userId: string) {
    return await this.prisma.profiles.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
