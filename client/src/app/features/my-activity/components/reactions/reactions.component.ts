import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-reactions",
  templateUrl: "./reactions.component.html",
  styleUrls: ["./reactions.component.css"]
})
export class ReactionsComponent implements OnInit {
  posts;
  user;
  loading = false;

  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    //use api to retrieve logged in user and store locally
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;

        //Once user is retrieved and verified, get posts for that user
        this.getPosts();
      }
    });
  }

  //gets all posts and filters them
  getPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe(response => {
      //filter posts by checking reactions of each post for any reactions made by the user
      this.posts = response.data.posts.filter(
        post =>
          post.reactions.heart.includes(this.user._id) ||
          post.reactions.laughing.includes(this.user._id) ||
          post.reactions.sad.includes(this.user._id) ||
          post.reactions.wow.includes(this.user._id) ||
          post.reactions.angry.includes(this.user._id)
      );
      this.loading = false;
    });
  }
}
