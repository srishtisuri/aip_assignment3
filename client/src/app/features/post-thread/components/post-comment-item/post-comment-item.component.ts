import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-comment-item',
  templateUrl: './post-comment-item.component.html',
  styleUrls: ['./post-comment-item.component.css']
})
export class PostCommentItemComponent implements OnInit {
  @Input() comment: Object;
  constructor() {}

  ngOnInit() {}
}
