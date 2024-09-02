import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Chart, ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexLegend, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';

import { RedesSociales, ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard-kpis',
  templateUrl: './dashboard-kpis.component.html',
  styleUrl: './dashboard-kpis.component.scss',
})
export class DashboardKpisComponent implements OnInit {
  redesSociales: ResponseRedesSociales | null = null;
  isSeekopSelected = false;
  private readonly STORAGE_KEY = 'redesSociales';
  selectedTab: string = 'vision-general';

   chartOptions: ChartOptions;
  /**chart temporal de seekop */

  labels = ['Nuevas conversaciones',
    'Conversaciones atentidas', 'Leads generados', 'Citas', 'Shows'];

  public polarAreaChartType: ChartType = 'polarArea';
  lineChartData = [
    {
      label: 'Dataset 1',
      data: this.generateNumbers({ count: 7, min: 0, max: 100 }),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: this.generateNumbers({ count: 7, min: 0, max: 100 }),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }
  ];
  data = [
    { group: 'Toluca', quantity: 115 },
    { group: 'Ecatepec de Morelos', quantity: 150 },
    { group: 'Naucalpan de Juárez', quantity: 200 },
    { group: 'Chalco', quantity: 180 },
    { group: 'Tlalnepantla de Baz', quantity: 220 },
    { group: 'Ecatepec de Morelos', quantity: 160 },
    { group: 'Naucalpan de Juárez', quantity: 210 },
    { group: 'Chalco', quantity: 190 },
    { group: 'Tlalnepantla de Baz', quantity: 230 },
  ];
  tableHeaders: string[] = ['Tipo', 'Fecha', 'Reacciones', 'Comentarios', 'Clics', 'Clins en el link',
    'Impresiones', 'Alcance', 'Reproducciones', 'Tiempo visto', 'Engagement', 'Gasto'];
  tableRows: any[][] = [
    ['ADS', 'Jun', '2', '5', 10, 10, 5, 20, 10, 5, 20, 899],
    ['POST', 'Ago', '2', '5', 10, 10, 5, 20, 10, 5, 20, 899],
    ['POST', 'Sep', '2', '5', 10, 10, 5, 20, 10, 5, 20, 899],
  ];

  distribuidores: any[] = [];
  selectedDistribuidor: string = '';
  constructor(private redesSocialesService: RedesSocialesService, private sidebarService: NbSidebarService) {
    this.chartOptions = {
      series: [
        {
          name: "Funnel Series",
          data: [50, 30, 10, 4, 2, 1]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: "80%",
          isFunnel: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        dropShadow: {
          enabled: true
        }
      },
      title: {
        text: "Seekop Funnel",
        align: "center"
      },
      xaxis: {
        categories: [
          "Nuevas conversaciones",
          "Conversaciones atendidas",
          "Leads generados",
          "Citas",
          "Shows",
          "Ventas",
        
        ]
      },
      legend: {
        show: false
      }
    };
  
  }



  ngOnInit(): void {
   
    this.distribuidores = [
      { nombre: 'Seminuevos Satelite' },
      { nombre: 'Distribuidor Norte' },
      { nombre: 'Distribuidor Sur' },
      { nombre: 'Distribuidor Este' },
      { nombre: 'Distribuidor Oeste' }
    ];


    this.redesSocialesService.getRedesSocialesFromSessionStorage().subscribe(
      data => {
        this.redesSociales = data;
      },
      error => {
        console.error('Error al obtener redes sociales', error);
      }
    );
    console.log(this.redesSociales);
  }
  

  loadNext(card: any) {
    // Implementa la lógica para cargar más datos aquí
  }
  private generateNumbers(config: { count: number, min: number, max: number }): number[] {
    const { count, min, max } = config;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  onClickSeekop() {
    this.isSeekopSelected = true;
    console.log(this.isSeekopSelected);
  }

  onSelectDistribuidor(event: any) {
    this.selectedDistribuidor = event;
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
    this.isSeekopSelected = false;
  }

  selectRedSocial(selectedRed: RedesSociales) {
   if(this.redesSociales)
    this.redesSociales.forEach(red => {
      red.selected = false;
    });
  
    selectedRed.selected = true;
    this.isSeekopSelected = false;
  }
}