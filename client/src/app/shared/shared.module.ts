import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SortWidgetComponent } from './sort-widget/sort-widget.component';
import { NewPostWidgetComponent } from './new-post-widget/new-post-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [SortWidgetComponent, NewPostWidgetComponent],
  imports: [AngularMaterialModule, NgxDropzoneModule, CommonModule],
  exports: [
    SortWidgetComponent,
    NewPostWidgetComponent,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
