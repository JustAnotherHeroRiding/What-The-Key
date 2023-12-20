import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LibraryComponent } from './pages/library/library.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { HomeComponent } from './pages/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackComponent } from './components/track/track.component';
import { SingleTrackPageComponent } from './pages/single-track-page/single-track-page.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { AccountComponent } from './pages/account/account.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { GithubProviderComponent } from './components/github-provider/github-provider.component';
import { SpotifyProviderComponent } from './components/spotify-provider/spotify-provider.component';
import { ApiPlaygroundComponent } from './pages/api-playground/api-playground.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultCardComponent,
    SearchResultComponent,
    LoadingSpinnerComponent,
    LibraryComponent,
    DeletedComponent,
    HomeComponent,
    TrackComponent,
    SingleTrackPageComponent,
    LogInComponent,
    AccountComponent,
    AvatarComponent,
    GithubProviderComponent,
    SpotifyProviderComponent,
    ApiPlaygroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
