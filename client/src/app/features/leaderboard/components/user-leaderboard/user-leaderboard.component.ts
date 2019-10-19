import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-leaderboard",
  templateUrl: "./user-leaderboard.component.html",
  styleUrls: ["./user-leaderboard.component.css"]
})
export class UserLeaderboardComponent implements OnInit {
  @Input() posts;
  @Input() users;

  ngOnInit() {}
}
