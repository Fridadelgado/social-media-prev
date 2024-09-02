import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublicacionRedComponent } from './modal-publicacion-red.component';

describe('ModalPublicacionRedComponent', () => {
  let component: ModalPublicacionRedComponent;
  let fixture: ComponentFixture<ModalPublicacionRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPublicacionRedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPublicacionRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
