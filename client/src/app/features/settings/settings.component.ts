import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  accountSettingsForm = null;
  user;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.user = res.data;
        this.accountSettingsForm = new FormGroup({
          name: new FormControl(this.user.name, Validators.required),
          username: new FormControl(this.user.username, Validators.required),
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
          password: new FormControl(undefined, [Validators.minLength(8), this.authService.passwordValidator]),
          avatar: new FormControl(this.user.avatar, Validators.required)
        });
      } else {
        this.router.navigate(["/account/login"]);
      }
    });
  }

  onSubmit() {
    this.accountSettingsForm.updateValueAndValidity();
    if (this.accountSettingsForm.valid) {
      this.accountSettingsForm.value._id = this.user._id;
      this.userService.updateUser(this.accountSettingsForm.value).subscribe(res => {
        if (res.status == "SUCCESS") {
          this.notificationService.notify("Settings updated successfully!");
          this.userService.getCurrentUser().subscribe(res => {
            if (res.data) {
              this.user = res.data;
            }
          });
        } else {
          this.notificationService.notify(res.error);
        }
      });
    } else {
      alert("please fix any errors and fill all required fields");
    }
  }

  setAvatar(image) {
    this.accountSettingsForm.controls["avatar"].setValue(image);
  }
}
