import { Component, OnInit } from '@angular/core';
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
})
export class MyActivityComponent implements OnInit {
  user;
  posts;
  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) { }

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
