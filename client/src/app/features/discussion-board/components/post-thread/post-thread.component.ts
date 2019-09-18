import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.css']
})
export class PostThreadComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }
  post = null;
  user = null;

  ngOnInit() {
    this.postService.getPost(this.activatedRoute.snapshot.params.id).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.post = response.data;
      }
    });
  }

}
