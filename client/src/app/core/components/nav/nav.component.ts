import { Component, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    share()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  logout() {
    this.authService.logout().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.authService.isLoggedIn = false;
        this.notificationService.notify("You have successfully logged out!");
      }
    });
  }
}
