import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-reported-posts",
  templateUrl: "./reported-posts.component.html",
  styleUrls: ["./reported-posts.component.css"]
})
export class ReportedPostsComponent implements OnInit {
  constructor(private postService: PostService) {}
  @Input() posts: any;
  @Input() loading: boolean;

  ngOnInit() {}
}
