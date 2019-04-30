import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmIndexComponent } from './index.component';

describe('FirmIndexComponent', () => {
  let component: FirmIndexComponent;
  let fixture: ComponentFixture<FirmIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
