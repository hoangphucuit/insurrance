import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentNumberComponent } from './parent-number.component';

describe('ParentNumberComponent', () => {
  let component: ParentNumberComponent;
  let fixture: ComponentFixture<ParentNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
