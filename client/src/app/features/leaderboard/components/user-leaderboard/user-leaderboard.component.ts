import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-leaderboard",
  templateUrl: "./user-leaderboard.component.html",
  styleUrls: ["./user-leaderboard.component.css"]
})
export class UserLeaderboardComponent implements OnInit {
  @Input() posts;
  users;
  // users; // [ {user:rishy, score: 5} ]
  ngOnInit() {
    console.log(this.posts);
    // this.sortByPosts();
  }
}
