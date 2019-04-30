import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oa1IndexHomeComponent } from './home.component';

describe('Oa1IndexHomeComponent', () => {
  let component: Oa1IndexHomeComponent;
  let fixture: ComponentFixture<Oa1IndexHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oa1IndexHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oa1IndexHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
