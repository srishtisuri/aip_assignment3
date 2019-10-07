import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-discussion-board",
  templateUrl: "./discussion-board.component.html",
  styleUrls: ["./discussion-board.component.css"]
})
export class DiscussionBoardComponent implements OnInit {
  posts;
  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
    });
  }

  uploadPost(image) {
    this.postService.uploadPost(image).subscribe(res => {
      this.getPosts();
    });
  }
}
