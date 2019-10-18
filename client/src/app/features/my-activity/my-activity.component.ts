import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-my-activity",
  templateUrl: "./my-activity.component.html",
  styleUrls: ["./my-activity.component.css"]
})
export class MyActivityComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(["/account/login"]);
    }
  }
}
