import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-kpi',
  templateUrl: './table-kpi.component.html',
  styleUrl: './table-kpi.component.scss'
})
export class TableKpiComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[][] = [];
}
