import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyActivityComponent } from './my-activity.component';
import { ReactionsComponent } from './components/reactions/reactions.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [MyActivityComponent, ReactionsComponent, PostsComponent, CommentsComponent],
  imports: [
    CommonModule
  ]
})
export class MyActivityModule { }
