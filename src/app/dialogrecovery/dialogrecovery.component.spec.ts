import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrecoveryComponent } from './dialogrecovery.component';

describe('DialogrecoveryComponent', () => {
  let component: DialogrecoveryComponent;
  let fixture: ComponentFixture<DialogrecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogrecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
