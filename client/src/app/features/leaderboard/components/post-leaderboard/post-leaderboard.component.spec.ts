import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLeaderboardComponent } from './post-leaderboard.component';

describe('PostLeaderboardComponent', () => {
  let component: PostLeaderboardComponent;
  let fixture: ComponentFixture<PostLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
