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
  loading = false;
  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;

    //use api to retrieve logged in user and store locally
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;

        //Once user is retrieved and verified, call api to get logged in user's comments
        this.postService.getMyComments().subscribe(response => {
          //store the returned post comments locally
          this.comments = response.data;
          this.loading = false;
        });
      }
    });
  }
}
