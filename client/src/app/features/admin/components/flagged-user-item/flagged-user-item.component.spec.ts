import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedUserItemComponent } from './flagged-user-item.component';

describe('FlaggedUserItemComponent', () => {
  let component: FlaggedUserItemComponent;
  let fixture: ComponentFixture<FlaggedUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedUserItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
