import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor(public authService: AuthService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.authService.isLoggedIn = false;
        this.notificationService.notify("You have successfully logged out!");
        this.router.navigate(["/discussion-board"]);
      }
    });
  }
}
