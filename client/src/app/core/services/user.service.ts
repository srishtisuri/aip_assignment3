import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = "/api/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.endpoint + "/login", { username, password });
  }
}
