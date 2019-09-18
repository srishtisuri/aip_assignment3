import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.css"]
})
export class PostFeedComponent implements OnInit {
  posts;
  isLoggedIn = false;

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => {
      console.log(response);
      this.posts = response.data;
    });
  }

  generatePosts() {
    if (this.isLoggedIn) {
      this.postService.generatePosts(parseInt(prompt("Enter an amount"))).subscribe(response => {
        console.log(response);
        this.getPosts();
      });
    } else {
      alert("You need to be logged in to do that!");
    }
  }
  dropPosts() {
    if (this.isLoggedIn) {
      this.postService.dropPosts().subscribe(response => {
        console.log(response);
        this.getPosts();
      });
    } else {
      alert("You need to be logged in to do that!");
    }
  }
}
