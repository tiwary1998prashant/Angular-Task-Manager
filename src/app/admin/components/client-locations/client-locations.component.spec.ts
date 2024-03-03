import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLocationsComponent } from './client-locations.component';

describe('ClientLocationsComponent', () => {
  let component: ClientLocationsComponent;
  let fixture: ComponentFixture<ClientLocationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientLocationsComponent]
    });
    fixture = TestBed.createComponent(ClientLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
