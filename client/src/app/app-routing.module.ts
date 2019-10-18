import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussionBoardComponent } from './features/discussion-board/discussion-board.component';
import { LeaderboardComponent } from './features/leaderboard/leaderboard.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AdminComponent } from './features/admin/admin.component';
import { PostThreadComponent } from './features/discussion-board/components/post-thread/post-thread.component';

const routes: Routes = [
  { path: 'discussion-board', component: DiscussionBoardComponent },
  { path: 'discussion-board/:id', component: PostThreadComponent },
  { path: 'post-thread', component: PostThreadComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'account', redirectTo: '/account/login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/discussion-board', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
