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

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.endpoint + "/postsWithUser?isComment=false");
  }

  getMyComments(): Observable<any> {
    return this.http.get<any>(this.endpoint + "/myComments");
  }

  getCommentParent(thread): Observable<any> {
    return this.http.get<any>(this.endpoint + "/" + thread + "/commentParent");
  }

  getPostComments(thread): Observable<any> {
    return this.http.get<any>(this.endpoint + "/" + thread + "/comments");
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

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + "/" + id);
  }

  changePost(image: string, thread: string, increment: number): Observable<any> {
    return this.http.put<any>(this.endpoint + "/", { image, thread, increment });
  }

  dropPosts(): Observable<any> {
    return this.http.get(this.endpoint + "/deleteAll/");
  }

  react(thread: string, reaction: string, oldReaction: string): Observable<any> {
    return this.http.put(this.endpoint + "/react", { thread, reaction, oldReaction });
  }
}
