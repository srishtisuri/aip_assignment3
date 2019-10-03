import { Component } from "@angular/core";
import { UserService } from "./core/services/user.service";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "./core/services/auth.service";
import { NotificationService } from "./core/services/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "im-board";

  constructor(private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    try {
      this.authService.checkAuth().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.authService.isLoggedIn = true;
          this.notificationService.notify("[DEV] JWT Authentication successful!");
        } else {
        }
      });
    } catch {
      this.authService.isLoggedIn = false;
    }
  }
}
