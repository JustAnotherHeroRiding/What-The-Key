import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogInComponent } from './log-in/log-in.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubProviderComponent } from './github-provider/github-provider.component';
import { SpotifyProviderComponent } from './spotify-provider/spotify-provider.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LogInComponent,
    AccountComponent,
    GithubProviderComponent,
    SpotifyProviderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
})
export default class AuthModule {}
  