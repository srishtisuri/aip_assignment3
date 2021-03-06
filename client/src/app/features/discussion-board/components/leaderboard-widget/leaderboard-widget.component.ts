import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-leaderboard-widget",
  templateUrl: "./leaderboard-widget.component.html",
  styleUrls: ["./leaderboard-widget.component.css"]
})
export class LeaderboardWidgetComponent implements OnInit {
  users;
  posts;

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.getPosts("popular");
    this.getUsersWithPosts();
  }

  getPosts(type?) {
    if (type != "posts" && type != "reactions") {
      this.postService.getPosts(type).subscribe(response => {
        if (response.data.posts.length > 3) {
          this.posts = response.data.posts.slice(0, 3);
        } else {
          this.posts = response.data.posts.slice(0, response.data.posts.length);
        }
      });
    }
  }

  getUsersWithPosts() {
    this.userService.getUsersWithPosts().subscribe(response => {
      this.users = response;
      this.sortUsersByReactions();
    });
  }

  totalReactionsForUser(user: any) {
    let total = 0;
    for (let i = 0; i < user.posts.length; i++) {
      for (let reaction in user.posts[i].reactions) {
        total += user.posts[i].reactions[reaction].length;
      }
    }
    return total;
  }

  sortUsersByReactions() {
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

// posts = [
//   {
//     id: 1,
//     imageUrl:
//       'https://www.fosi.org/media/images/22601782810_cbe3ede5f5_o.focus-none.original.jpg',
//     author: 'Srishti Suri',
//     username: 'srishtisuri',
//     comments: [],
//     reactions: []
//   },
//   {
//     id: 2,
//     imageUrl:
//       'https://fsmedia.imgix.net/76/13/a5/91/97ef/4ae0/87a6/83aec2a2e4a1/jag6pp1tfwx-dfqfkutwribttyvhifh4lhomyuxis0jpg.jpeg?auto=format%2Ccompress&dpr=2&w=650',
//     author: 'Rishy Ahluwalia',
//     username: 'rishyahluwalia',
//     comments: [],
//     reactions: []
//   },
//   {
//     id: 3,
//     imageUrl:
//       'https://i.kym-cdn.com/photos/images/newsfeed/001/504/739/5c0.jpg',
//     author: 'Christian Damtoft',
//     username: 'ctdamtoft',
//     comments: [],
//     reactions: []
//   }
// ];
// users = [
//   {
//     id: 1,
//     name: 'Srishti Suri',
//     username: 'srishtisuri',
//     profile:
//       'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/c0.0.1048.1048a/49439030_1174251269417861_6455593466616348672_o.jpg?_nc_cat=109&_nc_oc=AQmo-QhJsAi-oGg2-G214Mas_8Iv1wxibnWYjlB0ItPfJ5gSkPlytfwttxTgNGAmXEo&_nc_ht=scontent-syd2-1.xx&oh=d866d5eabb4f727a685358dba27eb93c&oe=5DD6457E'
//   },
//   {
//     id: 2,
//     name: 'Rishy Ahluwalia',
//     username: 'rishyahluwalia',
//     profile:
//       'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/47687313_2104908596195846_766186620457058304_n.jpg?_nc_cat=110&_nc_oc=AQnnd-4DR_1aqsNIprFPegN1L2E-svjosE-zz14oM8JBNAbLhlthqc9aa2MCdUE-qAM&_nc_ht=scontent-syd2-1.xx&oh=6628374d53ad37f1869acd7c2a15b817&oe=5DDB2328'
//   },
//   {
//     id: 3,
//     name: 'Christian Damtoft',
//     username: 'ctdamtoft',
//     profile:
//       'https://scontent-syd2-1.xx.fbcdn.net/v/t31.0-8/26172931_2086084758289396_4033699065580492637_o.jpg?_nc_cat=103&_nc_oc=AQmmecoWjx4eVz_avZkXR8I0WBhQPRuhYg99ZUHPwdB1-C1SllR0iVsbzUAZaA4csbQ&_nc_ht=scontent-syd2-1.xx&oh=efc1446867d26fea7d2a5f9e021a977f&oe=5E0DD385'
//   }
// ];
