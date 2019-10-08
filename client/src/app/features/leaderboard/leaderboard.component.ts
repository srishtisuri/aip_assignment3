import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { MatTabChangeEvent } from "@angular/material";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"]
})
export class LeaderboardComponent implements OnInit {
  posts;
  sortTypes;
  sortType;
  users;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts("popular");
    this.updateSortTypes(0); //start with 0 = users
  }

  getPosts(type?) {
    if (type != "posts" && type != "reactions" && type != "comments") {
      this.postService.getPosts(type).subscribe(response => {
        console.log(response);
        this.posts = response.data;
      });
    } else {
      // this.sortByPosts();
    }
  }

  updateSortTypes = index => {
    if (index == 0) {
      this.sortTypes = [
        { name: "Most Reactions", type: "reactions" },
        { name: "Most Posts", type: "posts" },
        { name: "Most Comments", type: "comments" }
      ];
    } else {
      this.sortTypes = [
        { name: "Most Popular", type: "popular" },
        { name: "Most Comments", type: "comments" },
        { name: "Most Hearts", type: "heart" },
        { name: "Most Laughs", type: "laughing" },
        { name: "Most Wow", type: "wow" },
        { name: "Most Sad", type: "sad" },
        { name: "Most Anger", type: "angry" }
      ];
    }
  };

  //https://stackoverflow.com/questions/52589504/angular-how-to-catch-mat-tab-changed-event
  //Answer posted by Prashant Damam
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // 0 = user, 1 = posts
    this.updateSortTypes(tabChangeEvent.index);
  };

  handleSortBy(type: string) {
    this.sortType = type;
    this.getPosts(type);
  }

  // sortByPosts() {
  //   let tempUsers = [];
  //   this.posts.forEach(post => {
  //     // if (tempUsers.indexOf({ username: post.username, count: 0 }) == -1) {
  //     tempUsers.push({ username: post.username, count: 0 });
  //   });
  //   console.log(tempUsers);
  // }
  totalReactions() {}
}
