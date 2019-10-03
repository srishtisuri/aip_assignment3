import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyActivityComponent } from './my-activity.component';
import { ReactionsComponent } from './components/reactions/reactions.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-activity', component: MyActivityComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: PostsComponent },
      { path: 'comments', component: CommentsComponent },
      { path: 'reactions', component: ReactionsComponent }

    ],
  }
];

@NgModule({
  declarations: [
    MyActivityComponent,
    ReactionsComponent,
    PostsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MyActivityModule { }
