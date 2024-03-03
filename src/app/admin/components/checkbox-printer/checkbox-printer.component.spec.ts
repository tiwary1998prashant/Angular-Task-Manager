import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxPrinterComponent } from './checkbox-printer.component';

describe('CheckboxPrinterComponent', () => {
  let component: CheckboxPrinterComponent;
  let fixture: ComponentFixture<CheckboxPrinterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxPrinterComponent]
    });
    fixture = TestBed.createComponent(CheckboxPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
