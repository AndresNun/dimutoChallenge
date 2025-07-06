
/**
 * Utility formatters following DRY principle
 * Centralized formatting functions to avoid code duplication
 */
export class Formatters {
  /**
   * Format number with thousands separator
   * @param value - Number to format
   * @returns Formatted string
   */
  static formatNumber(value: number): string {
    return value.toLocaleString();
  }

  /**
   * Format emissions value for axis display
   * @param value - Emission value
   * @returns Formatted string with 'k' suffix
   */
  static formatAxisValue(value: number): string {
    return `${(value / 1000).toFixed(1)}k`;
  }

  /**
   * Format percentage with one decimal place
   * @param value - Decimal percentage (0-1)
   * @returns Formatted percentage string
   */
  static formatPercentage(value: number): string {
    return `${(value * 100).toFixed(1)}%`;
  }

  /**
   * Format emission value for tooltip display
   * @param value - Emission value
   * @returns Formatted string with unit
   */
  static formatEmissionTooltip(value: number): string {
    return `${this.formatNumber(value)} kg CO₂`;
  }

  /**
   * Get impact level text based on percentage
   * @param percentage - Percentage value
   * @returns Impact level description
   */
  static getImpactLevel(percentage: number): string {
    if (percentage > 70) return '⚠️ Needs improvement';
    if (percentage > 40) return '🔄 Moderate impact';
    return '🌱 Most eco-friendly option';
  }
}
