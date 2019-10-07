import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-discussion-board",
  templateUrl: "./discussion-board.component.html",
  styleUrls: ["./discussion-board.component.css"]
})
export class DiscussionBoardComponent implements OnInit {
  posts;
  sortTypes = [
    { name: "Newest-Oldest", type: "new" },
    { name: "Oldest-Newest", type: "old" },
    { name: "Most Popular", type: "popular" },
    { name: "Most Comments", type: "comments" }
  ];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(type?) {
    this.postService.getPosts(type).subscribe(response => {
      this.posts = response.data;
    });
  }

  uploadPost(image) {
    this.postService.uploadPost(image).subscribe(res => {
      this.getPosts();
    });
  }

  handleSortBy(type: string) {
    this.getPosts(type);
  }
}
