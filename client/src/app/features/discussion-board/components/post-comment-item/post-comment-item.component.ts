import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.css']
})
export class PostCommentItemComponent implements OnInit {
  @Input() id: string;
  @Input() user: any;
  constructor(private postService: PostService) { }

  comment = null;
  author = { username: "ctdamtoft", name: "Christian" };
  showReactions = false;
  userHasReacted = false;
  reactButtonText = "React";
  currentReaction = null;
  isLoggedIn = false;

  ngOnInit() {
    this.postService.getPost(this.id).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.comment = response.data;
      }
      if (this.user != null) {
        this.isLoggedIn = true;
        this.getUserReaction();
      }
    });
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
