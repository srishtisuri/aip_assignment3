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
  ) { }

  accountSettingsForm = null;
  user;
  loading = false;

  ngOnInit() {
    this.loading = true;

    //Call api to get current User object
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        //if api returns data, update the user object in component
        this.user = res.data;

        //Create form strucuture and populate with current user data
        this.accountSettingsForm = new FormGroup({
          name: new FormControl(this.user.name, Validators.required),
          username: new FormControl(this.user.username, Validators.required),
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
          password: new FormControl(undefined, [Validators.minLength(8), this.authService.passwordValidator]),
          avatar: new FormControl(this.user.avatar, Validators.required)
        });
      } else {
        //if no user can be found, must not be logged in so redirect to login page
        this.router.navigate(["/account/login"]);
      }
      this.loading = false;
    });
  }

  //Function called when Save button is clicked
  onSubmit() {
    //refresh fields to check validity
    this.accountSettingsForm.updateValueAndValidity();

    //If fields completed satisfactorily, call api to update user obejct with form values
    if (this.accountSettingsForm.valid) {
      this.accountSettingsForm.value._id = this.user._id;
      this.userService.updateUser(this.accountSettingsForm.value).subscribe(res => {
        if (res.status == "SUCCESS") {
          //Display notification upon saving successfully
          this.notificationService.notify("Settings updated successfully!");
          //refresh component user object to ensure all data displayed is current
          this.userService.getCurrentUser().subscribe(res => {
            if (res.data) {
              this.user = res.data;
            }
          });
        } else {
          //Display error if user object could not be saved
          this.notificationService.notify(res.error);
        }
      });
    } else {
      //If fields not validated, notify user
      alert("please fix any errors and fill all required fields");
    }
  }

  //Callback passed down to new post widget, to update avatar form field upon image upload
  setAvatar(image) {
    this.accountSettingsForm.controls["avatar"].setValue(image);
  }
}
