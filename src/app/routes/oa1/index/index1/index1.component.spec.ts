import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oa1IndexIndex1Component } from './index1.component';

describe('Oa1IndexIndex1Component', () => {
  let component: Oa1IndexIndex1Component;
  let fixture: ComponentFixture<Oa1IndexIndex1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oa1IndexIndex1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oa1IndexIndex1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
