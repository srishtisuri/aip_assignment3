import { Injectable, Optional } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class PostService {
  endpoint: string = "/api/posts";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }

  generatePosts(amount: number): Observable<any> {
    return this.http.get<any>(this.endpoint + "/generate/" + amount);
  }

  dropPosts(): Observable<any> {
    return this.http.get(this.endpoint + "/test/");
  }

  react(thread: string, reaction: string, oldReaction: string): Observable<any> {
    //this.http.put("/api/users/addReaction", { "_id": userId, "myReaction": { "postId": thread, reaction } })
    return this.http.put(this.endpoint + "/react", { thread, reaction, oldReaction });
  }
}
