import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reported-posts',
  templateUrl: './reported-posts.component.html',
  styleUrls: ['./reported-posts.component.css']
})
export class ReportedPostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  posts = [
    {
      id: 1,
      imageUrl:
        "https://www.fosi.org/media/images/22601782810_cbe3ede5f5_o.focus-none.original.jpg",
      comments: [],
      reactions: [],
      user:"Christian Damtoft",
      reason: "text in image"
    },
    {
      id: 2,
      imageUrl:
        "https://fsmedia.imgix.net/76/13/a5/91/97ef/4ae0/87a6/83aec2a2e4a1/jag6pp1tfwx-dfqfkutwribttyvhifh4lhomyuxis0jpg.jpeg?auto=format%2Ccompress&dpr=2&w=650",
      comments: [],
      reactions: [],
      user:"Rishabh Ahluwalia",
      reason: "offensive"
    },
    {
      id: 3,
      imageUrl:
        "https://i.kym-cdn.com/photos/images/newsfeed/001/504/739/5c0.jpg",
      comments: [],
      reactions: [],
      user:"Srishti Suri",
      reason: "poor quality"
    }
  ];}
