import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableKpiComponent } from './table-kpi.component';

describe('TableKpiComponent', () => {
  let component: TableKpiComponent;
  let fixture: ComponentFixture<TableKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableKpiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
