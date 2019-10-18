import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaderboardItemComponent } from './user-leaderboard-item.component';

describe('UserLeaderboardItemComponent', () => {
  let component: UserLeaderboardItemComponent;
  let fixture: ComponentFixture<UserLeaderboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLeaderboardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeaderboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
