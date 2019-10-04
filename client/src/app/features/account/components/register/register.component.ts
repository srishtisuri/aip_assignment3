import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.authService.passwordValidator]],
      avatar: ["", Validators.required]
    });
    this.errors = [];
  }

  onSubmit() {
    this.registerForm.updateValueAndValidity();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(res => {
        if (res.status == "SUCCESS") {
          this.authService.isLoggedIn = true;
          this.notificationService.notify("You have successfully registered!");
          this.router.navigate(["/discussion-board"]);
        } else {
          this.errors.push(res.error);
        }
      });
    }
    else {
      alert("please fix any errors and fill all required fields");
    }
  }

  setAvatar(image) {
    console.log(image);
    this.registerForm.controls["avatar"].setValue(image);
  }
}
