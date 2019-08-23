import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardWidgetComponent } from './leaderboard-widget.component';

describe('LeaderboardWidgetComponent', () => {
  let component: LeaderboardWidgetComponent;
  let fixture: ComponentFixture<LeaderboardWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
