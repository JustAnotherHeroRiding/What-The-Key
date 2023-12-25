import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleTrackPageComponent } from './pages/single-track-page/single-track-page.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { ApiPlaygroundComponent } from './pages/api-playground/api-playground.component';
import { AuthGuard } from './guards/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'deleted', component: DeletedComponent, canActivate: [AuthGuard] },
  { path: 'track/:id', component: SingleTrackPageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: LogInComponent },
  { path: 'account', component: LogInComponent, canActivate: [AuthGuard] },
  { path: 'api-playground', component: ApiPlaygroundComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
