import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flagged-user-item',
  templateUrl: './flagged-user-item.component.html',
  styleUrls: ['./flagged-user-item.component.css']
})
export class FlaggedUserItemComponent implements OnInit {
  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
