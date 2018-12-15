import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryUnitComponent } from './entry-unit.component';

describe('EntryUnitComponent', () => {
  let component: EntryUnitComponent;
  let fixture: ComponentFixture<EntryUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
