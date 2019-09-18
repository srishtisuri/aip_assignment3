import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  endpoint: string = "/api/users";
  isLoggedIn;

  constructor(private http: HttpClient) {}

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
}
