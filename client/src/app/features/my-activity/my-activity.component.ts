import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: "app-my-activity",
  templateUrl: "./my-activity.component.html",
  styleUrls: ["./my-activity.component.css"]
})
export class MyActivityComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

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
    } catch {
      this.authService.isLoggedIn = false;
      this.userService.isAdmin = false;
    }
  }
}
