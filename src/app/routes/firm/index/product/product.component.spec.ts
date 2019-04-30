import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmIndexProductComponent } from './product.component';

describe('FirmIndexProductComponent', () => {
  let component: FirmIndexProductComponent;
  let fixture: ComponentFixture<FirmIndexProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmIndexProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmIndexProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
