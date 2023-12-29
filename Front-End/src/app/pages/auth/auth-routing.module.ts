import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from 'src/app/guards/auth.service';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register', component: LogInComponent },
  { path: 'account', component: LogInComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
