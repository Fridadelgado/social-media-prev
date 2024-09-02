import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registra los elementos necesarios y el plugin
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements AfterViewInit {
  @Input() socialMedia: any;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  valueToShow = 0; // Variable para mostrar el valor animado

  ngAfterViewInit(): void {
    //this.initializeChart();
    this.animateValue(0, this.socialMedia.values.actual, 300); // Iniciar la animación
  }

  formatNumber(value: number): string {
    return value.toLocaleString('en-US');
  }

  formatNumberUnDecimal(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }



  animateValue(start: number, end: number, duration: number): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this.valueToShow = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Determina si el cambio es positivo o negativo
      const cambio = this.socialMedia.values.actual - this.socialMedia.values.anterior;
      const esNegativo = cambio < 0;

      // Configura los colores y la etiqueta en base al cambio
      const color = esNegativo ? '#F77C74' : '#D2F16E'; // Rojo para negativo, verde para positivo
      const etiqueta = esNegativo ? 'Menos' : 'Más'; // Cambia la etiqueta en base al cambio


      // Define la configuración del gráfico
      const data: ChartData<'doughnut'> = {
        labels: ['Anterior', etiqueta],
        datasets: [{
          label: this.socialMedia.name,
          data: [this.socialMedia.values.anterior, this.socialMedia.values.actual - this.socialMedia.values.anterior],
          backgroundColor: ['#E2E2E2', color],
          hoverBackgroundColor: ['#E2E2E2', color],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverBorderColor: '#ffffff',
          hoverBorderWidth: 1,
          datalabels: {
            display: 'auto',
            opacity: 1,
            color: '#1E1E1E',
            font: {
              family: 'Montserrat',
              size: 25,
              weight: 'bold'
            },

            offset: 55,
            anchor: 'end',
            align: 'start',
            formatter: function (value, context) {
              if (context.dataIndex === 0) { // Cambiamos a índice 1 para aplicar al valor "Más" o incremento

                let valorActual: any = Number(context.chart.data.datasets[0].data[1]) + Number(value.toFixed(0))
                let valorAnterior = Number(value.toFixed(0))
                let porcentajeCambio = ((valorActual - valorAnterior) / valorAnterior) * 100;

                // Retorna el porcentaje de cambio formateado como un número decimal con 2 dígitos y añade el símbolo '%'
                return valorActual;
              } else {
                // Para el primer dato (valor anterior), solo muestra su valor sin calcular el porcentaje
                return value.toFixed(0); // Ajusta aquí si quieres mostrar decimales o no

              }
            }

          }
        }]
      };

      // Opciones del gráfico
      const options: ChartOptions<'doughnut'> = {
        cutout: '70%',
        maintainAspectRatio: false,
        aspectRatio: 2,
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        responsive: true,
        layout: {
          padding: 8
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label = Number(context.raw).toFixed(0) + '';
                }
                return label;
              }
            }
          }
        },
        // Asegúrate de que esta propiedad coincida con la versión de Chart.js que estás utilizando
      };

      // Crea el gráfico con la configuración definida
      new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
      });
    }

    this.chartCanvas.nativeElement.style.height = '220px';
  }

  calculatePercentage(anterior: number, actual: number): number {
    if (anterior === 0) {
      // Para evitar la división por cero si el valor anterior es 0
      return 0;
    } else {
      // Calcula el porcentaje de cambio
      return ((actual - anterior) / anterior) * 100;
    }
  }


}
