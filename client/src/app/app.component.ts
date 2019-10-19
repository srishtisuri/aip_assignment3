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

  constructor(private authService: AuthService, private notificationService: NotificationService, private userService: UserService) {}

  ngOnInit() {
    this.initialSetup();
  }
  initialSetup = async () => {
    try {
      await this.authService.checkAuth().subscribe(res => {
        if (res.status == "SUCCESS") {
          this.authService.isLoggedIn = true;
          //this.notificationService.notify("[DEV] JWT Authentication successful!");
        } else {
        }
        this.authService.loading = false;
      });
      this.userService.checkAdmin();
    } catch {
      this.authService.isLoggedIn = false;
      this.userService.isAdmin = false;
    }
  };
}
