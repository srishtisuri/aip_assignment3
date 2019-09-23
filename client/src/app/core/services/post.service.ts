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

  uploadPost(image) {
    return this.http.post<any>(this.endpoint, { image });
  }

  uploadComment(image, thread) {
    return this.http.post<any>(this.endpoint, { image, thread });
  }

  getPost(id: string): Observable<any> {
    return this.http.get<any>(this.endpoint + "/" + id);
  }

  generatePosts(amount: number): Observable<any> {
    return this.http.get<any>(this.endpoint + "/generate/" + amount);
  }

  dropPosts(): Observable<any> {
    return this.http.get(this.endpoint + "/deleteAll/");
  }

  react(thread: string, reaction: string, oldReaction: string): Observable<any> {
    console.log(thread, reaction, oldReaction);
    return this.http.put(this.endpoint + "/react", { thread, reaction, oldReaction });
  }
}
