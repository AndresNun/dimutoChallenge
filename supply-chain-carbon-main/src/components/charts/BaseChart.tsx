
import React from 'react';
import { ResponsiveContainer } from 'recharts';

/**
 * Abstract base chart component following Interface Segregation Principle
 * Provides common chart functionality and structure
 */
interface BaseChartProps {
  data: any[];
  height?: number;
  children: React.ReactElement;
  className?: string;
}

export const BaseChart: React.FC<BaseChartProps> = ({ 
  data, 
  height = 320, 
  children, 
  className = "bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border" 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center`} style={{ height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};
