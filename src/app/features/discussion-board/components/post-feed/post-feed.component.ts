import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.css"]
})
export class PostFeedComponent implements OnInit {
  posts = [
    {
      id: 1,
      imageUrl:
        "https://www.fosi.org/media/images/22601782810_cbe3ede5f5_o.focus-none.original.jpg",
      comments: [],
      reactions: []
    },
    {
      id: 2,
      imageUrl:
        "https://fsmedia.imgix.net/76/13/a5/91/97ef/4ae0/87a6/83aec2a2e4a1/jag6pp1tfwx-dfqfkutwribttyvhifh4lhomyuxis0jpg.jpeg?auto=format%2Ccompress&dpr=2&w=650",
      comments: [],
      reactions: []
    },
    {
      id: 3,
      imageUrl:
        "https://i.kym-cdn.com/photos/images/newsfeed/001/504/739/5c0.jpg",
      comments: [],
      reactions: []
    },
    {
      id: 4,
      imageUrl:
        "https://stickershop.line-scdn.net/stickershop/v1/product/3194922/LINEStorePC/main.png;compress=true",
      comments: [],
      reactions: []
    }
  ];
  constructor() {}

  ngOnInit() {}
}
