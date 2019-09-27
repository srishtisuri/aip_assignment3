import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-leaderboard-item',
  templateUrl: './user-leaderboard-item.component.html',
  styleUrls: ['./user-leaderboard-item.component.css']
})
export class UserLeaderboardItemComponent implements OnInit {
  @Input() user: any;

  constructor() { }

  ngOnInit() { }
}
