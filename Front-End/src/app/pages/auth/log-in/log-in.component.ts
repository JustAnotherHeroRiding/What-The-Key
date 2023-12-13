import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from 'src/app/supabase.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  loading = false;
  session = this.supabase.session

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }

  ngOnInit(): void {
    // Fetch the initial session state
    this.session = this.supabase.session;

    // Subscribe to future session changes
    this.supabase.authChanges((_, session) => {
      this.session = session;
      //console.log('Session updated:', session);
    });
  } 
}
