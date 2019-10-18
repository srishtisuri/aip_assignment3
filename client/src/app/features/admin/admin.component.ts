import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn || !this.userService.isAdmin) {
      this.router.navigate(["/account/login"]);
    }
  }
}
