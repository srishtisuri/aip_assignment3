import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "src/app/core/services/post.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-post-feed-item",
  templateUrl: "./post-feed-item.component.html",
  styleUrls: ["./post-feed-item.component.css"]
})
export class PostFeedItemComponent implements OnInit {
  @Input() post: any;
  @Input() user: any;
  constructor(private router: Router, private postService: PostService, private authService: AuthService) { }

  showReactions = false;
  userHasReacted = false;
  reactButtonText = "REACT";
  currentReaction = null;
  isLoggedIn = false;

  ngOnInit() { }

  ngOnChanges() {
    if (this.user != null) {
      console.log(this.user);
      this.getUserReaction();
    }
  }

  getUserReaction() {
    this.userHasReacted = false;
    for (let reaction in this.post.reactions) {
      if (this.post.reactions[reaction].includes(this.user._id)) {
        this.userHasReacted = true;
        this.reactButtonText = "REACTED";
        this.currentReaction = reaction;
        break;
      }
    }
    if (!this.userHasReacted) {
      this.userHasReacted = false;
      this.reactButtonText = "REACT";
      this.currentReaction = null;
    }
  }

  toggleReactions(showReactions) {
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  react(reaction) {
    this.postService.react(this.post._id, reaction, this.currentReaction).subscribe(response => {
      this.post = response.data;
      this.getUserReaction();
    });
  }
}
