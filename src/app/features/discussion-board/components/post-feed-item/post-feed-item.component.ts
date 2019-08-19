import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-feed-item",
  templateUrl: "./post-feed-item.component.html",
  styleUrls: ["./post-feed-item.component.css"]
})
export class PostFeedItemComponent implements OnInit {
  @Input() post: Object;
  constructor() {}

  ngOnInit() {}
}
