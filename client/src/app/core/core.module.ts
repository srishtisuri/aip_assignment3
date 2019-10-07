import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { NavComponent } from "./components/nav/nav.component";
import { PostService } from "./services/post.service";
import { HttpClientModule } from "@angular/common/http";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule, HttpClientModule, FlexLayoutModule],
  providers: [PostService],
  declarations: [NavComponent, SidenavComponent],
  exports: [NavComponent, SidenavComponent]
})
export class CoreModule { }
