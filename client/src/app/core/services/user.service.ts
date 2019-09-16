import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { User } from "src/app/shared/models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = "/api/users";
  user: User = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }

  login(username, password): Observable<any> {
    return this.http.post<any>(this.endpoint + "/login", { username, password });
  }

  setUser(user): void {
    this.user = user;
  }
  getUser(): Observable<any> {
    return of(this.user);
  }
  checkSession(): Observable<any> {
    return this.http.get<any>(this.endpoint + "/session");
  }
  logout(): Observable<any> {
    this.user = null;
    return this.http.get<any>(this.endpoint + "/logout");
  }
  register(registrationDetails): Observable<any> {
    return this.http.post<any>(this.endpoint, { user: registrationDetails });
  }
}
