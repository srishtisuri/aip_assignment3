import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DiscussionBoardComponent } from "./features/discussion-board/discussion-board.component";
import { LeaderboardComponent } from "./features/leaderboard/leaderboard.component";
import { SettingsComponent } from "./features/settings/settings.component";
import { AccountComponent } from "./features/account/account.component";
import { AdminComponent } from "./features/admin/admin.component";
import { PostThreadComponent } from "./features/post-thread/post-thread.component";

const routes: Routes = [
  { path: "discussion-board", component: DiscussionBoardComponent },
  { path: "post-thread/:id", component: PostThreadComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "settings", component: SettingsComponent },
  { path: "account", component: AccountComponent },
  { path: "admin", component: AdminComponent },
  { path: "", redirectTo: "/discussion-board", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
