import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedPostItemComponent } from './reported-post-item.component';

describe('ReportedPostItemComponent', () => {
  let component: ReportedPostItemComponent;
  let fixture: ComponentFixture<ReportedPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
