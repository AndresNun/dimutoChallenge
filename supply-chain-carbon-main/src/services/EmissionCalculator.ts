
import { EmissionData, ProductComparisonData, ChartMetrics } from '../types/emissions';

/**
 * Service class for emission calculations following Single Responsibility Principle
 * Handles all emission-related calculations and data processing
 */
export class EmissionCalculator {
  /**
   * Calculate total emissions from emission data array
   * @param data - Array of emission data
   * @returns Total emissions value
   */
  static calculateTotal(data: EmissionData[]): number {
    return data.reduce((sum, item) => sum + item.emissions, 0);
  }

  /**
   * Find the stage with highest emissions
   * @param data - Array of emission data
   * @returns EmissionData object with highest emissions
   */
  static findHighestEmissionStage(data: EmissionData[]): EmissionData {
    return data.reduce((max, item) => 
      item.emissions > max.emissions ? item : max, 
      data[0]
    );
  }

  /**
   * Calculate comprehensive metrics from emission data
   * @param data - Array of emission data
   * @returns ChartMetrics object with calculated values
   */
  static calculateMetrics(data: EmissionData[]): ChartMetrics {
    const emissions = data.map(item => item.emissions);
    return {
      total: this.calculateTotal(data),
      max: Math.max(...emissions),
      min: Math.min(...emissions),
      average: emissions.reduce((sum, val) => sum + val, 0) / emissions.length
    };
  }

  /**
   * Calculate emission percentage relative to maximum
   * @param value - Current emission value
   * @param maxValue - Maximum emission value
   * @returns Percentage as decimal (0-1)
   */
  static calculatePercentage(value: number, maxValue: number): number {
    return maxValue > 0 ? value / maxValue : 0;
  }

  /**
   * Calculate sustainability score (inverse of emission ratio)
   * @param emissions - Product emissions
   * @param maxEmissions - Maximum emissions in dataset
   * @returns Sustainability score (0-100)
   */
  static calculateSustainabilityScore(emissions: number, maxEmissions: number): number {
    return Math.round((1 - emissions / maxEmissions) * 100);
  }
}
