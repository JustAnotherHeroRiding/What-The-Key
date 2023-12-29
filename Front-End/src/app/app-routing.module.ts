import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApiPlaygroundComponent } from './pages/api-playground/api-playground.component';
import { AuthGuard } from './guards/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./pages/track/track.module').then((m) => m.TrackModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'api-playground', component: ApiPlaygroundComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
