import { NgModule } from "@angular/core";
import { DiscussionBoardComponent } from "./discussion-board.component";
import { LeaderboardWidgetComponent } from "./components/leaderboard-widget/leaderboard-widget.component";
import { NewPostWidgetComponent } from "./components/new-post-widget/new-post-widget.component";
import { PostFeedComponent } from "./components/post-feed/post-feed.component";
import { PostFeedItemComponent } from "./components/post-feed-item/post-feed-item.component";
import { PostCommentItemComponent } from "./components/post-comment-item/post-comment-item.component";
import { PostThreadComponent } from "./components/post-thread/post-thread.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NgxDropzoneModule } from "ngx-dropzone";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    DiscussionBoardComponent,
    LeaderboardWidgetComponent,
    NewPostWidgetComponent,
    PostFeedComponent,
    PostFeedItemComponent,
    PostThreadComponent,
    PostCommentItemComponent
  ],
  imports: [SharedModule, NgxDropzoneModule, RouterModule]
})
export class DiscussionBoardModule {}
