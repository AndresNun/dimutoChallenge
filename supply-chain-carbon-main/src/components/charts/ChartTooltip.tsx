
import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Formatters } from '../../utils/formatters';

/**
 * Reusable tooltip component following DRY principle
 * Handles consistent tooltip formatting across all charts
 */
interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  data?: any;
  maxValue?: number;
  showRecommendation?: boolean;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ 
  active, 
  payload, 
  label, 
  data, 
  maxValue,
  showRecommendation = false 
}) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;
  const percentage = maxValue ? (value / maxValue) * 100 : 0;
  const isHighImpact = percentage > 40;

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl max-w-xs">
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: payload[0].color }} 
        />
        <p className="font-bold text-gray-800">{label}</p>
      </div>
      
      <div className="space-y-2">
        <p className="text-green-600 font-semibold">
          Emissions: {Formatters.formatEmissionTooltip(value)}
        </p>
        
        {maxValue && (
          <div className="flex items-center gap-2">
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {Formatters.formatPercentage(percentage / 100)}
            </div>
            {isHighImpact ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        )}
        
        {showRecommendation && data?.recommendation && (
          <div className="mt-3 p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-1">💡 Recommendation:</p>
            <p className="text-xs text-gray-700">{data.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
