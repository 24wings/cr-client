import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oa1IndexComponent } from './index.component';

describe('Oa1IndexComponent', () => {
  let component: Oa1IndexComponent;
  let fixture: ComponentFixture<Oa1IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oa1IndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oa1IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
