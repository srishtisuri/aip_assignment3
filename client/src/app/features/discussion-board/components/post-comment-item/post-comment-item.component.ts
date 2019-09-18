import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.css']
})
export class PostCommentItemComponent implements OnInit {
  @Input() id: string;
  constructor(private postService: PostService) { }

  comment = null;
  user = { username: "ctdamtoft", name: "Christian" };

  ngOnInit() {
    this.postService.getPost(this.id).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.comment = response.data;
      }

    });
  }
}
