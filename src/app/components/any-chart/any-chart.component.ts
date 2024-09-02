import { Component, Input } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-any-chart',
  templateUrl: './any-chart.component.html',
  styleUrl: './any-chart.component.scss'
})
export class AnyChartComponent {
  @Input() chartType: ChartType = 'line';
  @Input() chartLabels: string[] = [];
  @Input() chartData: ChartDataset[] = [];
  @Input() chartOptions: ChartOptions = { responsive: true };
  @Input() chartLegend: boolean = true;
  @Input() chartPlugins: any[] = [];


  generateNumbers(config: { count: number, min: number, max: number }): number[] {
    const { count, min, max } = config;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }
}
