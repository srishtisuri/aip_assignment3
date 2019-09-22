import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.css"]
})
export class PostFeedComponent implements OnInit {
  @Input() posts;
  @Output() getPosts = new EventEmitter();
  user;

  constructor(private postService: PostService, private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.authService.isLoggedIn = true;
        this.user = res.data;
      }
    });
  }

  generatePosts() {
    if (this.authService.isLoggedIn) {
      this.postService.generatePosts(parseInt(prompt("Enter an amount"))).subscribe(response => {
        this.getPosts.emit();
      });
    } else {
      alert("You need to be logged in to do that!");
    }
  }
  dropPosts() {
    if (this.authService.isLoggedIn) {
      this.postService.dropPosts().subscribe(response => {
        this.getPosts.emit();
      });
    } else {
      alert("You need to be logged in to do that!");
    }
  }
}
