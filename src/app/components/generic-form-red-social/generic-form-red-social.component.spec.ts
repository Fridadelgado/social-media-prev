import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFormRedSocialComponent } from './generic-form-red-social.component';

describe('GenericFormRedSocialComponent', () => {
  let component: GenericFormRedSocialComponent;
  let fixture: ComponentFixture<GenericFormRedSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericFormRedSocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericFormRedSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
