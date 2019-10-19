import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-leaderboard-item",
  templateUrl: "./user-leaderboard-item.component.html",
  styleUrls: ["./user-leaderboard-item.component.css"]
})
export class UserLeaderboardItemComponent implements OnInit {
  @Input() user: any;
  @Input() order: any;
  totalReactions = 0;

  constructor() {}

  ngOnInit() {
    this.totalReactionsPerUser();
  }

  totalComments() {
    let total = 0;
    for (let i = 0; i < this.user.posts.length; i++) {
      total += this.user.posts[i].comments.length;
    }
    return total;
  }

  totalReactionsPerUser() {
    for (let i = 0; i < this.user.posts.length; i++) {
      for (let reaction in this.user.posts[i].reactions) {
        // console.log(this.user.username, this.user.posts[i].reactions[reaction].length);
        this.totalReactions += this.user.posts[i].reactions[reaction].length;
      }
    }
  }
}
