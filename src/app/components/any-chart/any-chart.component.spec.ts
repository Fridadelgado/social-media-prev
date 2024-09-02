import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyChartComponent } from './any-chart.component';

describe('AnyChartComponent', () => {
  let component: AnyChartComponent;
  let fixture: ComponentFixture<AnyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
