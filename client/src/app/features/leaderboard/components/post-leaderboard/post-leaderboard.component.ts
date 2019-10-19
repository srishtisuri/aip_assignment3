import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-post-leaderboard",
  templateUrl: "./post-leaderboard.component.html",
  styleUrls: ["./post-leaderboard.component.css"]
})
export class PostLeaderboardComponent implements OnInit {
  @Input() posts;
  @Input() loading: boolean;

  constructor() {}

  ngOnInit() {}
}
