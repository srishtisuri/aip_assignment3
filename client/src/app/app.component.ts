import { Component } from "@angular/core";
import { UserService } from "./core/services/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "im-board";
  isLoggedIn = false;

  constructor(private userService: UserService, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  updateIsLoggedIn() {
    console.log("UPDATED");
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
}
