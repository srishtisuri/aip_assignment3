import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-leaderboard",
  templateUrl: "./post-leaderboard.component.html",
  styleUrls: ["./post-leaderboard.component.css"]
})
export class PostLeaderboardComponent implements OnInit {
  @Input() posts;
  constructor() {}

  ngOnInit() {}
}
