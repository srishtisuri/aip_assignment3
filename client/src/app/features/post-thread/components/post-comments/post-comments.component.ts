import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  comments = [
    {
      id: 1,
      image: 'another comment',
      author: 'Srishti Suri',
      username: 'srishtisuri'
    },
    {
      id: 2,
      image: 'yet another comment',
      author: 'Rishy Ahluwalia',
      username: 'rishyahluwalia'
    },
    {
      id: 3,
      image: 'and once again, yet another comment',
      author: 'Christian Damtoft',
      username: 'ctdamtoft'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
