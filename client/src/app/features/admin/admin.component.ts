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
      this.authService.checkAuth().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.authService.isLoggedIn = true;
          //this.notificationService.notify("[DEV] JWT Authentication successful!");
        } else {
          this.router.navigate(["/account/login"]);
        }
        this.authService.loading = false;
      });
      this.userService.checkAdmin();
      this.getPosts();
    } catch {
      this.authService.isLoggedIn = false;
      this.userService.isAdmin = false;
    }
    // admin check
    // if (this.userService.isAdmin) {
    //   this.getPosts();
    // } else {
    //   this.router.navigate(["/account/login"]);
    // }
  }

  //https://stackoverflow.com/questions/52589504/angular-how-to-catch-mat-tab-changed-event
  //Answer posted by Prashant Damam
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    // 0 = posts, 1 = users
    if (tabChangeEvent.index == 0) this.getPosts();
    if(tabChangeEvent.index == 1) this.getUsers();
  };

  getUsers(){
    this.loading = true;
    this.userService.getUsers().subscribe(response=>{
      this.users = response.data
      this.loading = false;
      this.getFlaggedIps();
    })
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
  
  getFlaggedIps() {
    this.users.forEach(user => {
      if (!(user.ips in this.flaggedIps)) {
        this.flaggedIps[user.ips] = [];
        this.flaggedIps[user.ips].push(user)
      } else {
        this.flaggedIps[user.ips].push(user)
      }
    });
  }
}
