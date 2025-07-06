
import { ColorThreshold } from '../types/emissions';

/**
 * Color management service following Open/Closed Principle
 * Manages color schemes and thresholds for different chart types
 */
export class ColorManager {
  private static readonly DEFAULT_COLORS = ['#16a34a', '#0891b2', '#7c3aed', '#dc2626', '#ea580c'];
  
  private static readonly EMISSION_THRESHOLDS: ColorThreshold = {
    low: 0.4,
    medium: 0.7,
    high: 1.0
  };

  /**
   * Get color based on emission ratio using threshold logic
   * @param ratio - Emission ratio (0-1)
   * @returns CSS color string
   */
  static getEmissionColor(ratio: number): string {
    if (ratio > this.EMISSION_THRESHOLDS.medium) return '#ef4444'; // High - red
    if (ratio > this.EMISSION_THRESHOLDS.low) return '#f59e0b';    // Medium - amber
    return '#10b981'; // Low - emerald
  }

  /**
   * Get gradient URL for emission level
   * @param ratio - Emission ratio (0-1)
   * @returns CSS gradient URL string
   */
  static getEmissionGradient(ratio: number): string {
    if (ratio > this.EMISSION_THRESHOLDS.medium) return 'url(#redGradient)';
    if (ratio > this.EMISSION_THRESHOLDS.low) return 'url(#amberGradient)';
    return 'url(#greenGradient)';
  }

  /**
   * Get default color palette for charts
   * @param index - Color index
   * @returns CSS color string
   */
  static getDefaultColor(index: number): string {
    return this.DEFAULT_COLORS[index % this.DEFAULT_COLORS.length];
  }

  /**
   * Get background color class based on ranking
   * @param isFirst - Is first place
   * @param isLast - Is last place
   * @returns Tailwind CSS classes
   */
  static getRankingBackground(isFirst: boolean, isLast: boolean): string {
    if (isFirst) return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
    if (isLast) return 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200';
    return 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200';
  }
}
