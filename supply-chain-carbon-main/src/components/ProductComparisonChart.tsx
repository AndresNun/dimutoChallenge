
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';
import { ProductComparisonData } from '../types/emissions';
import { EmissionCalculator } from '../services/EmissionCalculator';
import { ColorManager } from '../services/ColorManager';
import { Formatters } from '../utils/formatters';
import { BaseChart } from './charts/BaseChart';

interface ProductComparisonChartProps {
  data: ProductComparisonData[];
}

/**
 * Product comparison chart component following SOLID principles
 * Compares total emissions across different products
 */
export const ProductComparisonChart = ({ data }: ProductComparisonChartProps) => {
  // Process and sort data
  const maxEmissions = Math.max(...data.map(d => d.totalEmissions));
  const enhancedData = data.map((item, index) => ({
    ...item,
    sustainabilityScore: EmissionCalculator.calculateSustainabilityScore(item.totalEmissions, maxEmissions)
  })).sort((a, b) => a.totalEmissions - b.totalEmissions);

  /**
   * Custom tooltip for product comparison
   */
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const value = payload[0].value;
    const isLowest = value === Math.min(...data.map(d => d.totalEmissions));
    
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: payload[0].color }}
          />
          <p className="font-semibold text-gray-800">{label}</p>
          {isLowest && <Award className="h-4 w-4 text-green-600" />}
        </div>
        <p className="text-blue-600 font-medium">
          Total Emissions: {Formatters.formatEmissionTooltip(value)}
        </p>
        <div className="mt-2 text-xs text-gray-600">
          {isLowest ? '🏆 Most Sustainable' : 'Room for improvement'}
        </div>
      </div>
    );
  };

  /**
   * Product comparison cards component
   */
  const ComparisonCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {enhancedData.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === enhancedData.length - 1;
        const bgClass = ColorManager.getRankingBackground(isFirst, isLast);
        
        return (
          <div
            key={item.product}
            className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${bgClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                {item.product}
                {isFirst && <Award className="h-4 w-4 text-green-600" />}
              </h3>
              <div className={`text-xs px-2 py-1 rounded-full ${
                isFirst ? 'bg-green-100 text-green-700' : 
                isLast ? 'bg-red-100 text-red-700' : 
                'bg-blue-100 text-blue-700'
              }`}>
                #{index + 1}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Emissions</span>
                <span className="font-bold text-gray-800">
                  {Formatters.formatEmissionTooltip(item.totalEmissions)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sustainability Score</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${
                    item.sustainabilityScore >= 70 ? 'text-green-600' :
                    item.sustainabilityScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.sustainabilityScore}/100
                  </span>
                  <TrendingUp className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              {Formatters.getImpactLevel(item.sustainabilityScore)}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <BaseChart data={enhancedData} height={320}>
        <BarChart
          data={enhancedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="product" 
            tick={{ fontSize: 12, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={Formatters.formatAxisValue}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalEmissions" radius={[8, 8, 0, 0]}>
            {enhancedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={ColorManager.getDefaultColor(index)} 
              />
            ))}
          </Bar>
        </BarChart>
      </BaseChart>

      <ComparisonCards />
    </div>
  );
};
