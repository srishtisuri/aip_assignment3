import { NgModule } from "@angular/core";
import { PostLeaderboardComponent } from "./components/post-leaderboard/post-leaderboard.component";
import { PostLeaderboardItemComponent } from "./components/post-leaderboard-item/post-leaderboard-item.component";
import { UserLeaderboardComponent } from "./components/user-leaderboard/user-leaderboard.component";
import { UserLeaderboardItemComponent } from "./components/user-leaderboard-item/user-leaderboard-item.component";
import { LeaderboardComponent } from "./leaderboard.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    PostLeaderboardComponent,
    PostLeaderboardItemComponent,
    UserLeaderboardComponent,
    UserLeaderboardItemComponent,
    LeaderboardComponent
  ],
  imports: [SharedModule]
})
export class LeaderboardModule {}
