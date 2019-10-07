import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "./shared/angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { DiscussionBoardModule } from "./features/discussion-board/discussion-board.module";
import { LeaderboardModule } from "./features/leaderboard/leaderboard.module";
import { SettingsModule } from "./features/settings/settings.module";
import { AccountModule } from "./features/account/account.module";
import { AdminModule } from "./features/admin/admin.module";
import { MyActivityModule } from './features/my-activity/my-activity.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DiscussionBoardModule,
    LeaderboardModule,
    SettingsModule,
    AccountModule,
    AdminModule,
    MyActivityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
