import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-leaderboard-item',
  templateUrl: './post-leaderboard-item.component.html',
  styleUrls: ['./post-leaderboard-item.component.css']
})
export class PostLeaderboardItemComponent implements OnInit {
  @Input() post: Object;
  constructor() {}

  ngOnInit() {}
}
