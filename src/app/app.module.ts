import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { DiscussionBoardModule } from "./features/discussion-board/discussion-board.module";
import { PostThreadModule } from "./features/post-thread/post-thread.module";
import { LeaderboardModule } from "./features/leaderboard/leaderboard.module";
import { SettingsModule } from "./features/settings/settings.module";
import { AccountModule } from "./features/account/account.module";
import { AdminModule } from "./features/admin/admin.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    DiscussionBoardModule,
    PostThreadModule,
    LeaderboardModule,
    SettingsModule,
    AccountModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
