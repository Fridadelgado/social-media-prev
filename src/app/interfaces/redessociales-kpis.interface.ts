export interface KpiValue {
    anterior: number;
    actual: number;
}

export interface KpiMetric {
    name: string;
    values: {
        days_28: KpiValue;
        week: KpiValue;
        day: KpiValue;
    };
}

export interface KpiCategory {
    category: string;
    metrics: KpiMetric[];
}

export interface SocialMediaKpi {
    socialMedia: string;
    KPIs: KpiCategory[];
}

export interface FilteredKpi {
    category: string;
    name: string;
    socialMedia: string;
    values: KpiValue;
}
