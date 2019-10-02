import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyActivityComponent } from './my-activity.component';
import { ReactionsComponent } from './components/reactions/reactions.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MyActivityComponent,
    ReactionsComponent,
    PostsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyActivityModule { }
