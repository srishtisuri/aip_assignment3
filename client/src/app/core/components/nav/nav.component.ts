import { Component, Output, EventEmitter } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent {
  @Output() public sidenavToggle = new EventEmitter();
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(result => result.matches),
  //   share()
  // );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private notificationService: NotificationService,
    public userService: UserService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.authService.isLoggedIn = false;
        this.userService.isAdmin = false;
        this.notificationService.notify("You have successfully logged out!");
        this.router.navigate(["/discussion-board"]);
      }
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
