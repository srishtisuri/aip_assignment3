import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { MatTabChangeEvent } from "@angular/material";
import { UserService } from "src/app/core/services/user.service";

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
  loading = false;

  constructor(private postService: PostService, private userService: UserService) {}

  //initialise the component with posts and users
  ngOnInit() {
    this.getUsersWithPosts();
    this.getPosts("popular");
    this.handleSortBy({ type: "popular", length: 7 });
    this.updateSortTypes(0); //start with 0 = users
  }

  //ensure that the leaderboard is live by fetching every time the tabs are switched to update the rankings
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // 0 = user, 1 = posts
    this.updateSortTypes(tabChangeEvent.index);
    if (tabChangeEvent.index == 0) this.getUsersWithPosts();
    if (tabChangeEvent.index == 1) {
      this.getPosts("popular");
      this.handleSortBy({ type: "popular", length: 7 });
    }
  };

  //get the users with a application level join in the backend
  //initially fetches the users in a predetermined order of "greatest number of posts"
  getUsersWithPosts() {
    this.loading = true;
    this.userService.getUsersWithPosts().subscribe(response => {
      this.users = response;
      this.handleSortBy({ type: "posts", length: 3 });
      this.loading = false;
    });
  }

  //get posts and limit the display to only 10 rankings on the leaderboard
  getPosts(type?) {
    this.loading = true;
    if (type != "posts" && type != "reactions") {
      this.postService.getPosts(type).subscribe(response => {
        if (response.data.posts.length > 10) {
          this.posts = response.data.posts.slice(0, 10);
        } else {
          this.posts = response.data.posts.slice(0, response.data.posts.length);
        }
        this.loading = false;
      });
    }
  }

  //sort widget dynamically receives the filter types from this function
  //if user is on the user tab then it will show certain filters, likewise for the posts tab
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
  //determines whether or not the users are being handled or the posts
  handleSortBy(obj: any) {
    this.sortType = obj.type;
    if (obj.length == 3) {
      this.sortUsers(obj.type);
    } else {
      this.getPosts(obj.type);
    }
  }

  //Total number of comments on the posts made by each user
  totalComments(user: any) {
    let total = 0;
    for (let i = 0; i < user.posts.length; i++) {
      total += user.posts[i].comments.length;
    }
    return total;
  }

  //calculates the total number of reactions a user has received on all their posts combined
  totalReactionsForUser(user: any) {
    let total = 0;
    for (let i = 0; i < user.posts.length; i++) {
      for (let reaction in user.posts[i].reactions) {
        total += user.posts[i].reactions[reaction].length;
      }
    }
    return total;
  }

  //sorts the users by either total number of posts, comments or reactions
  sortUsers(type: string) {
    if (type == "posts") {
      for (let j = 0; j < this.users.length; j++) {
        for (let i = 0; i < this.users.length - 1; i++) {
          if (this.users[i].posts.length < this.users[i + 1].posts.length) {
            let temp = this.users[i];
            this.users[i] = this.users[i + 1];
            this.users[i + 1] = temp;
          }
        }
      }
    } else if (type == "comments") {
      for (let j = 0; j < this.users.length; j++) {
        for (let i = 0; i < this.users.length - 1; i++) {
          if (this.totalComments(this.users[i]) < this.totalComments(this.users[i + 1])) {
            let temp = this.users[i];
            this.users[i] = this.users[i + 1];
            this.users[i + 1] = temp;
          }
        }
      }
    } else if (type == "reactions") {
      for (let j = 0; j < this.users.length; j++) {
        for (let i = 0; i < this.users.length - 1; i++) {
          if (this.totalReactionsForUser(this.users[i]) < this.totalReactionsForUser(this.users[i + 1])) {
            let temp = this.users[i];
            this.users[i] = this.users[i + 1];
            this.users[i + 1] = temp;
          }
        }
      }
    }
  }
}
