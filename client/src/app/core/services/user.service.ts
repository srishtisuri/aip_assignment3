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

  setUser(user): void {
    this.user = user;
  }

  getCurrentUser() {
    return this.http.get<any>(this.endpoint + "/current");
  }
}
