import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadBigComponent } from './head-big.component';

describe('HeadBigComponent', () => {
  let component: HeadBigComponent;
  let fixture: ComponentFixture<HeadBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
