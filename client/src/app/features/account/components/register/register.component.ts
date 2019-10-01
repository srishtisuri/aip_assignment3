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
      email: ["", Validators.required],
      password: ["", Validators.required],
      avatar: ["", Validators.required]
    });
    this.errors = [];
  }

  onSubmit() {
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

  setAvatar(image) {
    console.log(image);
    this.registerForm.controls["avatar"].setValue(image);
  }
}
