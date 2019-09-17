import { Component, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent {
  isLoggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    share()
  );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  ngOnInit() {
    this.userService.checkSession().subscribe(res => {
      if (res.user) {
        this.userService.setUser(res.user);
        this.isLoggedIn = true;
        this.openSnackBar("You are successfully authenticated!", "Ok");
      }
    });
  }

  logout() {
    this.userService.logout().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.isLoggedIn = false;
        window.location.href = "/";
        this.openSnackBar("You have successfully logged out!", "Ok");
      } else {
        this.isLoggedIn = true;
      }
    });
  }
}
