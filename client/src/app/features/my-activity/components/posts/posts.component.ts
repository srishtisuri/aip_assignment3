import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) { }
  posts;
  user;
  loading = false;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;
        this.getPosts();
      }
    });
  }

  getPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe(response => {
      if (response.data) {
        this.posts = response.data.posts.filter(post => post.author == this.user._id);
      }
      this.loading = false;
    });
  }
}
