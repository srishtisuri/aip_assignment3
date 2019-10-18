import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-reported-posts",
  templateUrl: "./reported-posts.component.html",
  styleUrls: ["./reported-posts.component.css"]
})
export class ReportedPostsComponent implements OnInit {
  constructor(private postService: PostService) {}
  posts = [];

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => {
      if (response.data) {
        response.data.posts.forEach(post => {
          if (post.report.status == true) {
            this.posts.push(post);
          }
        });
      }
      this.posts.reverse();
    });
  }
}
