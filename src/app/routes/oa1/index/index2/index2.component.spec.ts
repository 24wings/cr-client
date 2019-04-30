import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oa1IndexIndex2Component } from './index2.component';

describe('Oa1IndexIndex2Component', () => {
  let component: Oa1IndexIndex2Component;
  let fixture: ComponentFixture<Oa1IndexIndex2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oa1IndexIndex2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oa1IndexIndex2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
