import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-leaderboard-item",
  templateUrl: "./post-leaderboard-item.component.html",
  styleUrls: ["./post-leaderboard-item.component.css"]
})
export class PostLeaderboardItemComponent implements OnInit {
  @Input() post: any;
  @Input() order: any;
  totalReactions: number;
  totalComments: number;
  constructor() {}

  ngOnInit() {
    this.totalReactions =
      this.post.reactions["heart"].length +
      this.post.reactions["laughing"].length +
      this.post.reactions["wow"].length +
      this.post.reactions["sad"].length +
      this.post.reactions["angry"].length;

    this.totalComments = this.post.comments.length;
  }
}
