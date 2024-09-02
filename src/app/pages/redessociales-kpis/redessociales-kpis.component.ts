import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';
import { YouTubeService } from '../../services/youtube.service';
import { FilteredKpi, KpiCategory, KpiMetric, SocialMediaKpi } from 'src/app/interfaces/redessociales-kpis.interface';
import { RedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { InstagramService } from 'src/app/services/instagram.service';


@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  kpisData: SocialMediaKpi[] = [];
  groupedKpisData: any[] = [];
  filteredKpisData: FilteredKpi[] = [];
  selectedSocialMedias: Set<string> = new Set();
  redesSociales: RedesSociales[] = [];
  timeFilter: 'days_28' | 'week' | 'day' = 'days_28';
  currentTitle: string = ""; // Título inicial
  selectedCategories: string[] = []; // Para almacenar múltiples categorías
  allCategories?: string[]; // Para almacenar todas las categorías disponibles

  constructor(private facebookService: FacebookService, private youTubeService: YouTubeService, private instagramService: InstagramService,
    private publicacionesService: PublicacionesService) { }

  ngOnInit() {
    this.loadKpis();
   

  }
  loadKpis() {
    this.facebookService.getKpis().subscribe(
      (facebookData: SocialMediaKpi[]) => {
        console.log(facebookData);
        this.kpisData = Array.isArray(facebookData) ? facebookData : [];
        this.youTubeService.getKpis().subscribe(
          (youtubeData: SocialMediaKpi[]) => {
            this.kpisData = this.kpisData.concat(Array.isArray(youtubeData) ? youtubeData : []);

            this.instagramService.getKpis().subscribe(
              (instagramData: SocialMediaKpi[]) => {
                this.kpisData = this.kpisData.concat(Array.isArray(instagramData) ? instagramData : []);

                this.allCategories = Array.from(new Set(this.kpisData.reduce((acc, kpi) => {
                  kpi.KPIs.forEach(kpiCategory => acc.push(kpiCategory.category));
                  return acc;
                }, [] as string[])));

                this.selectedCategories = [...this.allCategories];
                this.applyFilters();  // Aplica filtros iniciales o actualiza la vista
              },
              error => {
                console.error('Error loading KPIs from Instagram:', error);
              }
            );
          },
          error => {
            console.error('Error loading KPIs from YouTube:', error);
          }
        );
      },
      error => {
        console.error('Error loading KPIs from Facebook:', error);
      }
    );
  }

  toggleSocialMedia(selectedSocialMedia: RedesSociales): void {
    if (selectedSocialMedia.selected) {
      // Si ya está seleccionada, deselecciona y limpia el arreglo
      selectedSocialMedia.selected = false;
      this.selectedSocialMedias.clear();
      this.updateCurrentTitle(null, this.timeFilter);
    } else {
      this.redesSociales.forEach(socialMedia => {
        socialMedia.selected = false;
      });
      selectedSocialMedia.selected = true;
      this.selectedSocialMedias.clear();
      this.selectedSocialMedias.add(selectedSocialMedia.nombre.toLowerCase());
      this.updateCurrentTitle(selectedSocialMedia.nombre, this.timeFilter);
    }
    this.applyFilters();
  }



  setTimeFilter(filter: 'days_28' | 'week' | 'day'): void {
    this.timeFilter = filter;
    const selectedSocialMediaName = this.selectedSocialMedias.size > 0 ? Array.from(this.selectedSocialMedias)[0] : null;
    this.updateCurrentTitle(selectedSocialMediaName, filter);
    this.applyFilters();
  }

  updateCurrentTitle(socialMediaName: string | null, timeFilter: 'days_28' | 'week' | 'day'): void {
    let timeFilterText = '';
    switch (timeFilter) {
      case 'days_28':
        timeFilterText = "KPI's por Mes";
        break;
      case 'week':
        timeFilterText = "KPI's por Semana";
        break;
      case 'day':
        timeFilterText = "KPI's por Día";
        break;
      default:
        timeFilterText = "KPI's";
    }
    this.currentTitle = socialMediaName ? `${timeFilterText} de ${socialMediaName.toUpperCase()}` : timeFilterText;
  }

  applyFilters() {
    this.filteredKpisData = [];
    let categoriesForSelectedSocials = new Set<string>();

    this.kpisData.forEach(socialMediaData => {
      if (this.selectedSocialMedias.has(socialMediaData.socialMedia)) {
        socialMediaData.KPIs.forEach(category => {
          categoriesForSelectedSocials.add(category.category);
        });

        const filteredData = socialMediaData.KPIs
          .filter(category => this.selectedCategories.includes(category.category))
          .reduce((acc, category: KpiCategory) => {
            category.metrics
              .filter((metric: KpiMetric) => metric.values[this.timeFilter].actual !== 0 || metric.values[this.timeFilter].anterior !== 0)
              .forEach((metric: KpiMetric) => {
                acc.push({
                  category: category.category,
                  name: metric.name,
                  socialMedia: socialMediaData.socialMedia,
                  values: metric.values[this.timeFilter],
                });
              });
            return acc;
          }, [] as FilteredKpi[]);
        this.filteredKpisData.push(...filteredData);
      }
    });

    this.allCategories = Array.from(categoriesForSelectedSocials);
    this.transformKpisDataForCategories();
  }

  transformKpisDataForCategories() {
    const categoriesMap = new Map<string, FilteredKpi[]>();
    this.filteredKpisData.forEach(kpi => {
      if (!categoriesMap.has(kpi.category)) {
        categoriesMap.set(kpi.category, []);
      }
      categoriesMap.get(kpi.category)?.push(kpi);
    });


    this.groupedKpisData = Array.from(categoriesMap, ([category, kpis]) => ({ category, kpis }));
  }
}
