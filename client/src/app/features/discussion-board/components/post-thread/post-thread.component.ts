import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/core/services/post.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.css']
})
export class PostThreadComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private userService: UserService) { }
  post = null;
  user = null;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      if (res.data) {
        this.user = res.data;
      }
    });
    this.activatedRoute.params.subscribe(params => {
      this.getPost(params.id);
    });
  }

  getPost(thread) {
    this.postService.getPost(thread).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.post = response.data;
      }
    });
  }
}
