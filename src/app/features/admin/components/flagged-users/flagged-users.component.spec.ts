import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedUsersComponent } from './flagged-users.component';

describe('FlaggedUsersComponent', () => {
  let component: FlaggedUsersComponent;
  let fixture: ComponentFixture<FlaggedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
