import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reported-post-item',
  templateUrl: './reported-post-item.component.html',
  styleUrls: ['./reported-post-item.component.css']
})
export class ReportedPostItemComponent implements OnInit {
  @Input() post: any;

  constructor() { }

  ngOnInit() {
  }

}
