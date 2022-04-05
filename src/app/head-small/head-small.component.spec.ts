import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadSmallComponent } from './head-small.component';

describe('HeadSmallComponent', () => {
  let component: HeadSmallComponent;
  let fixture: ComponentFixture<HeadSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
