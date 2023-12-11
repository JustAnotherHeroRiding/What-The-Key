import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
