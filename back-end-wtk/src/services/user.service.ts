import { Injectable } from '@nestjs/common';
import { supabaseAdmin } from './supabase.service';

@Injectable()
export class UserService {
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
}
