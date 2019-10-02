import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts;
  @Input() user;
  @Output() getPosts = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
}
