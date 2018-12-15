import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlUnitComponent } from './control-unit.component';

describe('ControlUnitComponent', () => {
  let component: ControlUnitComponent;
  let fixture: ComponentFixture<ControlUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
