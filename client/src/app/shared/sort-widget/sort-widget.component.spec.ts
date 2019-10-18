import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortWidgetComponent } from './sort-widget.component';

describe('SortWidgetComponent', () => {
  let component: SortWidgetComponent;
  let fixture: ComponentFixture<SortWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
