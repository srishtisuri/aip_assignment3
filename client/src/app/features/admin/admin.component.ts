import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { MatTabChangeEvent } from "@angular/material";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  posts = [];
  users = [];
  loading = false;
  flaggedIps = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    try {
      // logged in check
      this.authService.checkAuth().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.authService.isLoggedIn = true;
          //this.notificationService.notify("[DEV] JWT Authentication successful!");
        } else {
          this.router.navigate(["/account/login"]);
        }
        this.authService.loading = false;
      });
      // admin check
      this.userService.getCurrentUser().subscribe(res => {
        if (res.data) {
          if (res.data.role == "admin") {
            this.getUsers();
          } else {
            this.router.navigate(["/account/login"]);
          }
        }
      });
    } catch {
      this.authService.isLoggedIn = false;
      this.userService.isAdmin = false;
    }
  }

  //https://stackoverflow.com/questions/52589504/angular-how-to-catch-mat-tab-changed-event
  //Answer posted by Prashant Damam
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // 0 = posts, 1 = users
    if (tabChangeEvent.index == 0) this.getUsers();
    if (tabChangeEvent.index == 1) this.getPosts();
  };

  getUsers() {
    this.loading = true;
    this.users = [];
     this.userService.getFlaggedUsers().subscribe(response => {
       console.log(response);
       if(response.status=="SUCCESS"){
         this.users = response.data;
       }
      this.loading = false;
    });
  }

  getPosts() {
    this.loading = true;
    this.posts = [];
    this.postService.getPosts().subscribe(response => {
      if (response.data) {
        response.data.posts.forEach(post => {
          if (post.report.status == true) {
            this.posts.push(post);
          }
        });
      }
      this.posts.reverse();
      this.loading = false;
    });
  }

}
