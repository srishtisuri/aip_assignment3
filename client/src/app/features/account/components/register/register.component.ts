import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {}

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe(res => {
      console.log(res);
      if (res.data) {
        this.openSnackBar("You have successfully registered!", "Ok");
        this.router.navigate(["/account/login"]);
      } else {
        this.errors.push(res.error);
      }
    });
  }
}
