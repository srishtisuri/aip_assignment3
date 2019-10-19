import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-post-thread",
  templateUrl: "./post-thread.component.html",
  styleUrls: ["./post-thread.component.css"]
})
export class PostThreadComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private userService: UserService) {}
  post = null;
  user = null;
  comments = [];
  thread;
  loading = true;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.user = res.data;
      }
    });
    this.activatedRoute.params.subscribe(params => {
      this.thread = params.id;
      this.getPost();
    });
  }

  getPost() {
    return this.postService.getPost(this.thread).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.post = response.data;
        this.getComments();
        this.loading = false;
      }
    });
  }

  getComments() {
    this.postService.getPostComments(this.thread).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.comments = response.data;
      }
    });
  }

  uploadComment(image) {
    this.postService.uploadComment(image, this.post._id).subscribe(res => {
      this.getPost();
    });
  }
}
