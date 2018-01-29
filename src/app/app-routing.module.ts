import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollEditComponent } from './poll/poll-edit/poll-edit.component';
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { PollDetailComponent } from './poll/poll-detail/poll-detail.component';
import { PollResultComponent } from './poll/poll-result/poll-result.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', component: PollDetailComponent },
  { path: 'poll-list', component: PollListComponent, canActivate: [AuthGuard]  },
  { path: 'poll-edit/:id', component: PollEditComponent, canActivate: [AuthGuard]  },
  { path: 'result/:id', component:  PollResultComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'about', component:  AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
