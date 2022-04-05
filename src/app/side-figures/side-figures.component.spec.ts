import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFiguresComponent } from './side-figures.component';

describe('SideFiguresComponent', () => {
  let component: SideFiguresComponent;
  let fixture: ComponentFixture<SideFiguresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideFiguresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
