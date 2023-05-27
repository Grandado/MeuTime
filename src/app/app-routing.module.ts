import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeuTimeAuthComponent } from './meu-time-auth/meu-time-auth.component';
import { MeuTimeDashboardComponent } from './meu-time-dashboard/meu-time-dashboard.component';

const routes: Routes = [
  { path: 'auth', component: MeuTimeAuthComponent },
  { path: 'home', component: MeuTimeDashboardComponent },
  //{ path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
