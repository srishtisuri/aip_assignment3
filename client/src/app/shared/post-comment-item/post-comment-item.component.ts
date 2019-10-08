import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-comment-item",
  templateUrl: "./post-comment-item.component.html",
  styleUrls: ["./post-comment-item.component.css"]
})
export class PostCommentItemComponent implements OnInit {
  @Input() comment: any;
  @Input() user: any;
  constructor(private router: Router, private postService: PostService, public authService: AuthService) {}

  showReactions = false;
  userHasReacted = false;
  reactButtonText = "React";
  currentReaction = null;
  isMyActivityPage;
  parent;

  ngOnInit() {
    this.isMyActivityPage = this.router.url == "/my-activity/comments";

    if (this.user != null && this.comment != null) {
      this.getUserReaction();
    }
    if (this.isMyActivityPage) {
      this.postService.getCommentParent(this.comment._id).subscribe(response => {
        if (response.status == "SUCCESS") {
          this.parent = response.data;
        }
      });
    }
  }

  getUserReaction() {
    this.userHasReacted = false;
    for (let reaction in this.comment.reactions) {
      if (this.comment.reactions[reaction].includes(this.user._id)) {
        this.userHasReacted = true;
        this.reactButtonText = "Reacted";
        this.currentReaction = reaction;
        break;
      }
    }
    if (!this.userHasReacted) {
      this.userHasReacted = false;
      this.reactButtonText = "React";
      this.currentReaction = null;
    }
  }

  toggleReactions(showReactions) {
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  react(reaction) {
    this.postService.react(this.comment._id, reaction, this.currentReaction).subscribe(response => {
      this.comment = response.data;
      this.getUserReaction();
    });
  }
}
