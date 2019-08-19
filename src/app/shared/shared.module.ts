import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "./angular-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SortWidgetComponent } from "./sort-widget/sort-widget.component";

@NgModule({
  declarations: [SortWidgetComponent],
  imports: [AngularMaterialModule],
  exports: [
    SortWidgetComponent,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class SharedModule {}
