import { NgModule } from "@angular/core";
import { DiscussionBoardComponent } from "./discussion-board.component";
import { LeaderboardWidgetComponent } from "./components/leaderboard-widget/leaderboard-widget.component";
import { PostFeedComponent } from "./components/post-feed/post-feed.component";
import { PostThreadComponent } from "./components/post-thread/post-thread.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    DiscussionBoardComponent,
    LeaderboardWidgetComponent,
    PostFeedComponent,
    PostThreadComponent
  ],
  imports: [SharedModule, RouterModule]
})
export class DiscussionBoardModule { }
