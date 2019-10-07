import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  ngOnInit() { }
  constructor(public authService: AuthService, private notificationService: NotificationService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.authService.isLoggedIn = false;
        this.notificationService.notify("You have successfully logged out!");
        this.router.navigate(["/discussion-board"]);
      }
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
