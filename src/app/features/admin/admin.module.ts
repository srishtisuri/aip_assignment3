import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportedPostsComponent } from "./components/reported-posts/reported-posts.component";
import { ReportedPostItemComponent } from "./components/reported-post-item/reported-post-item.component";
import { FlaggedUsersComponent } from "./components/flagged-users/flagged-users.component";
import { AdminComponent } from "./admin.component";
import { FlaggedUserItemComponent } from "./components/flagged-user-item/flagged-user-item.component";

@NgModule({
  declarations: [
    ReportedPostsComponent,
    ReportedPostItemComponent,
    FlaggedUsersComponent,
    FlaggedUserItemComponent,
    AdminComponent
  ],
  imports: [CommonModule]
})
export class AdminModule {}
