import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-post-feed-item',
  templateUrl: './post-feed-item.component.html',
  styleUrls: ['./post-feed-item.component.css']
})
export class PostFeedItemComponent implements OnInit {
  @Input() post: any;
  constructor(private router: Router, private postService: PostService) { }

  //temp user till getUser service created
  user = {
    myReactions: [
      {
        postId: "5d6dcbdd8e139044b3cf1877",
        reaction: "heart"
      },
      {
        postId: "5d6dcbde8e139044b3cf1879",
        reaction: "sad"
      }
    ]
  }
  showReactions = false;
  userHasReacted = false;
  reactButtonText = "REACT";
  currentReaction = null;

  ngOnInit() {
    this.getMyReaction();
  }

  getMyReaction() {
    if (this.user.myReactions.map(reaction => reaction.postId).includes(this.post._id)) {
      this.userHasReacted = true;
      this.reactButtonText = "REACTED";
      this.currentReaction = this.user.myReactions.find(reaction => reaction.postId == this.post._id).reaction;
    }
    else {
      this.userHasReacted = false;
      this.reactButtonText = "REACT";
      this.currentReaction = null;
    }
  }

  handleClick(id) {
    console.log(id);
    this.router.navigate(['/post-thread/']);
  }

  toggleReactions(showReactions) {
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  react(reaction) {
    this.postService.react(this.post._id, reaction, this.currentReaction).subscribe(response => {
      this.post = response.data;
    });

    //TODO: change this to push reaction to user in db
    if (reaction == this.currentReaction) {
      this.user.myReactions = this.user.myReactions.filter(reaction => reaction.postId != this.post._id)
    } else {
      try { this.user.myReactions.find(reaction => reaction.postId = this.post._id).reaction = reaction }
      catch {
        this.user.myReactions.push({ postId: this.post._id, reaction: reaction });
      }
    }
    this.getMyReaction();
  }
}
