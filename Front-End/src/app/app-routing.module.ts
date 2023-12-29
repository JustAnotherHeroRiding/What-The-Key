import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';
import { ApiPlaygroundComponent } from './pages/api-playground/api-playground.component';
import { AuthGuard } from './guards/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    loadChildren: () =>
      import('./pages/track/track.module').then((m) => m.TrackModule),
  },
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
