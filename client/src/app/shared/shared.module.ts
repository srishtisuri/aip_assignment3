import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SortWidgetComponent } from './sort-widget/sort-widget.component';
import { NewPostWidgetComponent } from './new-post-widget/new-post-widget.component';
import { PostFeedItemComponent } from './post-feed-item/post-feed-item.component';
import { PostCommentItemComponent } from './post-comment-item/post-comment-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [SortWidgetComponent, NewPostWidgetComponent, PostFeedItemComponent, PostCommentItemComponent],
  imports: [AngularMaterialModule, NgxDropzoneModule, CommonModule, RouterModule],
  exports: [
    SortWidgetComponent,
    NewPostWidgetComponent,
    PostFeedItemComponent,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    PostCommentItemComponent
  ]
})
export class SharedModule { }
