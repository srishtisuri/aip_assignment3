import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.css"]
})
export class PostFeedComponent implements OnInit {
  posts;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(response => {
      console.log(response);
      this.posts = response.data;
    });
  }
}
