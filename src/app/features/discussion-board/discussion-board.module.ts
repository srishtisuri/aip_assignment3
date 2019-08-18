import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionBoardComponent } from './discussion-board.component';
import { LeaderboardWidgetComponent } from './components/leaderboard-widget/leaderboard-widget.component';
import { NewPostWidgetComponent } from './components/new-post-widget/new-post-widget.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { PostFeedItemComponent } from './components/post-feed-item/post-feed-item.component';



@NgModule({
  declarations: [DiscussionBoardComponent, LeaderboardWidgetComponent, NewPostWidgetComponent, PostFeedComponent, PostFeedItemComponent],
  imports: [
    CommonModule
  ]
})
export class DiscussionBoardModule { }
