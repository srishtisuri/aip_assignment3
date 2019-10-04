import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  endpoint: string = "/api/users";
  isLoggedIn;

  constructor(private http: HttpClient) { }

  login(username, password) {
    return this.http.post<any>(this.endpoint + "/login", { username, password });
  }

  logout() {
    return this.http.get<any>(this.endpoint + "/logout");
  }

  register(registrationDetails) {
    return this.http.post<any>(this.endpoint, { user: registrationDetails });
  }

  checkAuth() {
    return this.http.get<any>(this.endpoint + "/auth");
  }

  getUser() {
    return this.http.get<any>(this.endpoint);
  }


  // This code is based on an answer by "Krishna Rathore" on Stack Overflow
  // See https://stackoverflow.com/a/52044817
  passwordValidator = function (control: AbstractControl) {
    let value: string = control.value;
    let upperCaseCharacters = /[A-Z]+/g;
    let lowerCaseCharacters = /[a-z]+/g;
    let numberCharacters = /[0-9]+/g;
    if (value && (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false)) {
      return {
        passwordStrength: 'Password must contain the following: numbers, lowercase letters, and uppercase letters.'
      }
    }
  }
}
