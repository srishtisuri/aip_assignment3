import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  post = {
    id: 1,
    imageUrl:
      'https://www.fosi.org/media/images/22601782810_cbe3ede5f5_o.focus-none.original.jpg',
    author: 'Srishti Suri',
    username: 'srishtisuri',
    profile:
      'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/c0.0.1048.1048a/49439030_1174251269417861_6455593466616348672_o.jpg?_nc_cat=109&_nc_oc=AQmo-QhJsAi-oGg2-G214Mas_8Iv1wxibnWYjlB0ItPfJ5gSkPlytfwttxTgNGAmXEo&_nc_ht=scontent-syd2-1.xx&oh=d866d5eabb4f727a685358dba27eb93c&oe=5DD6457E',
    comments: [],
    reactions: []
  };
  constructor() {}

  ngOnInit() {}
}
