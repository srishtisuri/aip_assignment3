import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments;
  user;

  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;
      }
    });
    this.postService.getMyComments().subscribe(response => {
      this.comments = response.data;
    });
  }
}
