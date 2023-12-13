import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleTrackPageComponent } from './pages/single-track-page/single-track-page.component';
import { LogInComponent } from './pages/auth/log-in/log-in.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'deleted', component: DeletedComponent },
  { path: 'track/:id', component: SingleTrackPageComponent },
  { path: 'account', component: LogInComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
