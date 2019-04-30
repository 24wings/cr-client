import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oa1IndexIndex3Component } from './index3.component';

describe('Oa1IndexIndex3Component', () => {
  let component: Oa1IndexIndex3Component;
  let fixture: ComponentFixture<Oa1IndexIndex3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oa1IndexIndex3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oa1IndexIndex3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
