import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: 'app-post-feed-item',
  templateUrl: './post-feed-item.component.html',
  styleUrls: ['./post-feed-item.component.css']
})
export class PostFeedItemComponent implements OnInit {
  @Input() post: Object;
  constructor(private router: Router, private postService: PostService) { }

  showReactions = false;

  ngOnInit() { }

  handleClick(id) {
    console.log(id);
    this.router.navigate(['/post-thread/']);
  }

  toggleReactions(showReactions) {
    setTimeout(() => {
      this.showReactions = showReactions;
    }, 500);
  }

  react(reaction) {
    console.log(this.post);
    this.postService.react(this.post["_id"], reaction).subscribe(response => {
      this.post = response.data;
    });
  }
}
