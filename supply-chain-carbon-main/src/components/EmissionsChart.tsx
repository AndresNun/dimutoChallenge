
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { EmissionData } from '../types/emissions';
import { EmissionCalculator } from '../services/EmissionCalculator';
import { ColorManager } from '../services/ColorManager';
import { Formatters } from '../utils/formatters';
import { BaseChart } from './charts/BaseChart';
import { ChartTooltip } from './charts/ChartTooltip';

interface EmissionsChartProps {
  data: EmissionData[];
}

/**
 * Enhanced emissions chart component following SOLID principles
 * Displays supply chain stage emissions with visual enhancements
 */
export const EmissionsChart = ({ data }: EmissionsChartProps) => {
  // Calculate metrics using service
  const metrics = EmissionCalculator.calculateMetrics(data);
  const highestStage = EmissionCalculator.findHighestEmissionStage(data);

  /**
   * Custom label component for displaying values on bars
   */
  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="#374151" 
        textAnchor="middle" 
        fontSize="12"
        fontWeight="600"
      >
        {Formatters.formatNumber(value)}
      </text>
    );
  };

  /**
   * Gradient definitions for bars
   */
  const GradientDefinitions = () => (
    <defs>
      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
      </linearGradient>
      <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
      </linearGradient>
      <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
      </linearGradient>
    </defs>
  );

  /**
   * Chart header with statistics
   */
  const ChartHeader = () => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Total Emissions</h4>
          <p className="text-sm text-gray-600">
            {Formatters.formatEmissionTooltip(metrics.total)}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-xs text-gray-500">Highest Impact</p>
        <p className="font-semibold text-red-600">{highestStage.stage}</p>
      </div>
    </div>
  );

  /**
   * Legend component showing impact levels
   */
  const ChartLegend = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-green-400 to-green-600"></div>
        <div>
          <p className="text-sm font-medium text-green-800">Low Impact</p>
          <p className="text-xs text-green-600">≤ 40% of max emissions</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
        <div>
          <p className="text-sm font-medium text-amber-800">Medium Impact</p>
          <p className="text-xs text-amber-600">40-70% of max emissions</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-red-400 to-red-600"></div>
        <div>
          <p className="text-sm font-medium text-red-800">High Impact</p>
          <p className="text-xs text-red-600">&gt; 70% of max emissions</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <ChartHeader />

      <BaseChart data={data} height={320}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
        >
          <GradientDefinitions />
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="opacity-30"
            stroke="#e5e7eb"
          />
          
          <XAxis 
            dataKey="stage" 
            tick={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
            tickLine={false}
            axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
            interval={0}
          />
          
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
            tickFormatter={Formatters.formatAxisValue}
          />
          
          <Tooltip content={(props) => (
            <ChartTooltip 
              {...props} 
              maxValue={metrics.max}
              showRecommendation={true}
            />
          )} />
          
          <Bar 
            dataKey="emissions" 
            radius={[8, 8, 0, 0]}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LabelList content={<CustomLabel />} />
            {data.map((entry, index) => {
              const ratio = EmissionCalculator.calculatePercentage(entry.emissions, metrics.max);
              const fillUrl = ColorManager.getEmissionGradient(ratio);
              
              return <Cell key={`cell-${index}`} fill={fillUrl} />;
            })}
          </Bar>
        </BarChart>
      </BaseChart>

      <ChartLegend />
    </div>
  );
};
