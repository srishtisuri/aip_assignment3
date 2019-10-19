import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-post-comment-item",
  templateUrl: "./post-comment-item.component.html",
  styleUrls: ["./post-comment-item.component.css"]
})
export class PostCommentItemComponent implements OnInit {
  //Declare input parameters for component
  @Input() comment: any;
  @Input() user: any;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private postService: PostService,
    public authService: AuthService
  ) { }

  showReactions = false;
  userHasReacted = false;
  reactButtonText = "React";
  currentReaction = null;
  isMyActivityPage;
  parent;

  ngOnInit() {
    //check if My Activity is the parent page
    this.isMyActivityPage = this.router.url == "/my-activity/comments";

    //load user reactions once user and post are loaded
    if (this.user != null && this.comment != null) {
      this.getUserReaction();
    }

    //call api to get and save the parent post of the comment-item
    if (this.isMyActivityPage) {
      this.postService.getCommentParent(this.comment._id).subscribe(response => {
        if (response.status == "SUCCESS") {
          this.parent = response.data;
        }
      });
    }
  }

  //function to check if user has reacted to the comment item, 
  //and to change the react button and highlighted reaction accordingly
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

  //called when the mouse enters or leaves the react button
  //changes the state of the react popup.
  toggleReactions(showReactions) {
    //Timeout set to add delay to the popup disappearing
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  //function called when report button clicked
  report(reason) {
    //Call report api with comment id and reason.
    //Display notification once complete
    this.postService.report(this.comment._id, reason).subscribe(response => {
      if (response.data) {
        this.notificationService.notify("Successfully reported!");
      } else if (response.error) {
        this.notificationService.notify(response.error);
      }
    });
  }

  //Function called when a reaction is clicked
  react(reaction) {
    //call api to add user reaction to post
    this.postService.react(this.comment._id, reaction, this.currentReaction).subscribe(response => {
      //once reaction is sent, updated comment post is returned and notify
      //refresh the locally stored comment to update the frontend reaction counts
      if (response.status == "ERROR") {
        this.notificationService.notify("You cannot do that!");
      } else {
        this.comment = response.data;
      }

      //refresh the user reaction in the reaction popup
      this.getUserReaction();
    });
  }
}
