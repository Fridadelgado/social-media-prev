import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPrevPublicacionComponent } from './generic-prev-publicacion.component';

describe('GenericPrevPublicacionComponent', () => {
  let component: GenericPrevPublicacionComponent;
  let fixture: ComponentFixture<GenericPrevPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericPrevPublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericPrevPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
