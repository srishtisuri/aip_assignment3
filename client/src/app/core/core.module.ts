import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { NavComponent } from "./components/nav/nav.component";

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [NavComponent]
})
export class CoreModule {}
