import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
  @Output() getPosts = new EventEmitter();
  constructor(private router: Router, private postService: PostService, public authService: AuthService) { }

  showReactions = false;
  userHasReacted = false;
  reactButtonText = "REACT";
  currentReaction = null;
  isLoggedIn = false;
  canDelete = false;
  canRemove = false;
  canChange = false;
  changeClicked = false;
  isMyActivityPage = false;
  increment;

  ngOnInit() {
    this.onChanges();
  }

  onChanges() {
    if (this.user != null) {
      this.getUserReaction();
    }
    this.isMyActivityPage = this.router.url == "/my-activity/posts";
    this.canDelete = this.isMyActivityPage && this.post.comments.length == 0;
    this.canRemove = this.isMyActivityPage && this.post.comments.length != 0 && !this.post.image.includes("removed");
    this.canChange = this.canDelete
      && this.post.reactions["heart"].length == 0
      && this.post.reactions["wow"].length == 0
      && this.post.reactions["laughing"].length == 0
      && this.post.reactions["sad"].length == 0
      && this.post.reactions["angry"].length == 0;
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
      this.onChanges();
    });
  }

  report() { }

  change() {
    this.increment = this.post.history.length;
    this.changeClicked = !this.changeClicked;
  }

  changePost(image) {
    this.postService.changePost(image, this.post._id, this.increment).subscribe(res => {
      this.getPosts.emit();
    });
  }

  delete() {
    if (confirm("Are you sure you want to delete this post?")) {
      this.postService.deletePost(this.post._id).subscribe(response => {
        this.getPosts.emit();
        this.onChanges();
      });
    }
  }

  remove() {
    if (confirm("Are you sure you want to remove this post?")) {
      this.increment = this.post.history.length;
      this.postService.changePost(window.location.origin + "/assets/removed_image.png", this.post._id, this.increment).subscribe(response => {
        this.post = response.data;
        this.onChanges();
      });
    }
  }
}
