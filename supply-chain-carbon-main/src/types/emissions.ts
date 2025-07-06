
// Core emission data types and interfaces
export interface EmissionData {
  stage: string;
  emissions: number;
  recommendation: string;
}

export interface ProductComparisonData {
  product: string;
  totalEmissions: number;
}

export interface ChartMetrics {
  total: number;
  max: number;
  min: number;
  average: number;
}

export interface ColorThreshold {
  low: number;
  medium: number;
  high: number;
}

// Chart configuration interface
export interface ChartConfig {
  colors: string[];
  thresholds: ColorThreshold;
  formatters: {
    tooltip: (value: number) => string;
    axis: (value: number) => string;
  };
}
