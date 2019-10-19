import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
// import { User } from "src/app/shared/models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint: string = "/api/users";
  user: any = null;
  isAdmin = false;

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

  updateUser(details) {
    return this.http.put<any>(this.endpoint, { user: details });
  }

  checkAdmin = async () => {
    this.getCurrentUser().subscribe(res => {
      if (res.data) {
        if (res.data.role == "admin") {
          this.isAdmin = true;
          return of({ isAdmin: true });
        } else {
          return of({ isAdmin: false });
        }
      }
    });
  };

  getUsersWithPosts(): Observable<any> {
    return this.http.get<any>(this.endpoint + "/userLeaderboard");
  }
  getFlaggedUsers():Observable<any>{
    return this.http.get(this.endpoint + "/flaggedUsers");
  }
  deactivate(userId):Observable<any> {
    return this.http.put(this.endpoint +"/deactivate", {userId});
  }
}
