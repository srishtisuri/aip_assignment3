import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"]
})
export class LeaderboardComponent implements OnInit {
  posts;
  sortTypes = [
    { name: "Most Popular", type: "popular" },
    { name: "Most Comments", type: "comments" },
    { name: "Most Hearts", type: "heart" },
    { name: "Most Laughs", type: "laugh" },
    { name: "Most Wow", type: "wow" },
    { name: "Most Sad", type: "sad" },
    { name: "Most Anger", type: "angry" }
  ];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(type?) {
    this.postService.getPosts(type).subscribe(response => {
      console.log(response);
      this.posts = response.data;
    });
  }

  handleSortBy(type: string) {
    this.getPosts(type);
  }
}
