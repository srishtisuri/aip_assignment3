import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-feed-item",
  templateUrl: "./post-feed-item.component.html",
  styleUrls: ["./post-feed-item.component.css"]
})
export class PostFeedItemComponent implements OnInit {
  @Input() post: Object;
  constructor(private router: Router) {}

  ngOnInit() {}

  handleClick(id) {
    console.log(id);
    this.router.navigate(["/post-thread/"]);
  }
}
