import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  loading = false;
  session = this.supabase.session;
  location?: string;

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
    username: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  async onSubmit(action: 'magicLink' | 'signIn' | 'signUp'): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const username = this.signInForm.value.username as string;

      let result;
      if (action === 'magicLink') {
        result = await this.supabase.signIn(email); // Magic link sign-in
      } else if (action === 'signIn') {
        result = await this.supabase.signIn(email, password); // Regular sign-in
      } else if (action === 'signUp') {
        result = await this.supabase.signUp(email, password, username); // Sign-up
      }

      if (result && result.error) throw result.error;

      if (action === 'magicLink') {
        alert('Check your email for the login link!');
      } else {
        // Handle successful sign-in or sign-up
      }
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
      if (this.session) {
        this.router.navigate(['/account']);
      }
      //console.log('Session updated:', session);
    });
    this.location = this.router.url.split('/').pop() || '';
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
