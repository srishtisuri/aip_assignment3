import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { NavComponent } from "./components/nav/nav.component";
import { PostService } from "./services/post.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule, HttpClientModule],
  providers: [PostService],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class CoreModule {}
