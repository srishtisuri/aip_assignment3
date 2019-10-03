import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) { }
  posts;
  user;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;
      }
    });
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => {
      this.posts = response.data;
    });
  }
}
