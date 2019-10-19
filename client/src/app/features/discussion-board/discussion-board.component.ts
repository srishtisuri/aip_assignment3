import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-discussion-board",
  templateUrl: "./discussion-board.component.html",
  styleUrls: ["./discussion-board.component.css"]
})
export class DiscussionBoardComponent implements OnInit {
  posts;
  sortTypes = [
    { name: "Newest-Oldest", type: "new" },
    { name: "Oldest-Newest", type: "old" },
    { name: "Most Popular", type: "popular" },
    { name: "Most Comments", type: "comments" }
  ];
  pager: any;
  pageOfPosts: any;
  loading = true;

  constructor(private postService: PostService, public authService: AuthService, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    //this.getPosts("new");
    this.route.queryParams.subscribe(response => this.getPosts("new", response.page || 1));
  }

  getPosts(type?, page?) {
    this.postService.getPosts(type, page).subscribe(response => {
      console.log(response);
      if (response.data) {
        this.posts = response.data.pageOfPosts;
        this.pager = response.data.pager;
        this.pageOfPosts = response.data.pageOfPosts;
        this.loading = false;
      }
    });
  }

  uploadPost(image) {
    this.postService.uploadPost(image).subscribe(res => {
      this.getPosts();
    });
  }

  handleSortBy(type: string) {
    this.getPosts(type);
  }
}
