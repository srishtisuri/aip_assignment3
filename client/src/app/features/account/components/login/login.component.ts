import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.errors = [];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      if (res.data) {
        this.userService.setUser(res.data);
        this.openSnackBar("You have successfully logged in!", "Ok");
        window.location.href = "/";
        this.router.navigate(['/discussion-board'])
      } else {
        this.errors.push(res.error);
      }
    });
  }
}
