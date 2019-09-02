import { NgModule } from '@angular/core';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { PostCommentItemComponent } from './components/post-comment-item/post-comment-item.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { PostThreadComponent } from './post-thread.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostItemComponent,
    PostCommentsComponent,
    PostCommentItemComponent,
    NewCommentComponent,
    PostThreadComponent
  ],
  imports: [SharedModule]
})
export class PostThreadModule {}
