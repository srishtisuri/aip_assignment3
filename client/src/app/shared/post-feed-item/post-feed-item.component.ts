import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "src/app/core/services/post.service";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-post-feed-item",
  templateUrl: "./post-feed-item.component.html",
  styleUrls: ["./post-feed-item.component.css"]
})
export class PostFeedItemComponent implements OnInit {

  //Declare input parameters for component
  @Input() post: any;
  @Input() user: any;

  //Declare output parameters for component
  @Output() getPosts = new EventEmitter();

  constructor(
    private router: Router,
    private postService: PostService,
    public authService: AuthService,
    private notificationService: NotificationService
  ) { }

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

  //called in ngOnInit and whenever the post is modified by another function
  onChanges() {
    //load user reactions once user and post are loaded
    if (this.user != null) {
      this.getUserReaction();
    }

    //check if My Activity is the parent page
    this.isMyActivityPage = this.router.url == "/my-activity/posts";

    //logic to determine when a post can be deleted, removed or changed
    this.canDelete = this.isMyActivityPage && this.post.comments.length == 0;
    this.canRemove = this.isMyActivityPage && this.post.comments.length != 0 && !this.post.image.includes("removed");
    this.canChange =
      this.canDelete &&
      this.post.reactions["heart"].length == 0 &&
      this.post.reactions["wow"].length == 0 &&
      this.post.reactions["laughing"].length == 0 &&
      this.post.reactions["sad"].length == 0 &&
      this.post.reactions["angry"].length == 0;
  }

  //function to check if user has reacted to the comment item, 
  //and to change the react button and highlighted reaction accordingly
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

  //called when the mouse enters or leaves the react button
  //changes the state of the react popup.
  toggleReactions(showReactions) {
    //Timeout set to add delay to the popup disappearing
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  //Function called when a reaction is clicked
  react(reaction) {
    //call api to add user reaction to post
    this.postService.react(this.post._id, reaction, this.currentReaction).subscribe(response => {
      //once reaction is sent, updated comment post is returned and notify
      //refresh the locally stored comment to update the frontend reaction counts
      if (response.status == "ERROR") {
        this.notificationService.notify("You cannot do that!");
      } else {
        this.post = response.data;
      }

      //callback to parent to retrieve the posts now that one is updated
      this.getPosts.emit();
      this.onChanges();
    });
  }

  //function called when report button clicked
  report(reason) {
    //Call report api with comment id and reason.
    //Display notification once complete
    this.postService.report(this.post._id, reason).subscribe(response => {
      if (response.data) {
        this.notificationService.notify("Successfully reported!");
      } else if (response.error) {
        this.notificationService.notify(response.error);
      }
    });
  }

  //function called when change button clicked
  //prepares for uploading changed image and toggles flag that opens new post widget
  change() {
    this.increment = this.post.history.length;
    this.changeClicked = !this.changeClicked;
  }

  //callback passed to new post widget that is called when the post button is clicked
  changePost(image) {
    //call api to change the post, notify upon success
    this.postService.changePost(image, this.post._id).subscribe(res => {
      if (res.status != "SUCCESS") {
        this.notificationService.notify("Post cannot be changed if there are comments or reactions!");
      }
      //refresh posts to get the latest changes
      this.getPosts.emit();
    });
  }

  //function called when delete button is clicked
  delete() {
    //popup alert asking for confirmation
    if (confirm("Are you sure you want to delete this post?")) {
      //if confirmation received, call api to delete post, notify if successful
      this.postService.deletePost(this.post._id).subscribe(response => {
        if (response.status != "SUCCESS") {
          this.notificationService.notify("Post cannot be deleted while it has comments!");
        }
        //refresh posts to get the latest changes
        this.getPosts.emit();
        this.onChanges();
      });
    }
  }

  //function called when remove button is clicked
  remove() {
    //popup alert asking for confirmation
    if (confirm("Are you sure you want to remove this post?")) {
      this.increment = this.post.history.length;

      //call api to change the post to the removed image, notify upon success
      this.postService.changePost("http://aip-brogrammers.herokuapp.com/assets/removed_image.png", this.post._id).subscribe(response => {
        if (response.status != "SUCCESS") {
          this.notificationService.notify("Post has already been removed!");
        }
        //refresh posts to get the latest changes
        this.post = response.data;
        this.onChanges();
      });
    }
  }
}
