
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingDown, TrendingUp, Activity, AlertTriangle } from "lucide-react";

interface MonitoringData {
  currentEmissions: number;
  weeklyChange: number;
  monthlyChange: number;
  goalProgress: number;
  alerts: Array<{
    id: string;
    type: 'warning' | 'success' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

export const RealTimeMonitoring = () => {
  const [data, setData] = useState<MonitoringData>({
    currentEmissions: 5750,
    weeklyChange: -12.5,
    monthlyChange: -15.2,
    goalProgress: 98,
    alerts: [
      {
        id: '1',
        type: 'success',
        message: 'Monthly emission target achieved - 15% reduction',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        type: 'warning',
        message: 'Transport emissions spike detected this week',
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: '3',
        type: 'info',
        message: 'New efficiency measures implemented in production',
        timestamp: new Date(Date.now() - 10800000)
      }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        currentEmissions: prev.currentEmissions + (Math.random() - 0.5) * 50,
        weeklyChange: prev.weeklyChange + (Math.random() - 0.5) * 2,
        monthlyChange: prev.monthlyChange + (Math.random() - 0.5) * 1,
        goalProgress: Math.min(100, prev.goalProgress + Math.random() * 0.5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getChangeIcon = (change: number) => {
    return change < 0 ? TrendingDown : TrendingUp;
  };

  const getChangeColor = (change: number) => {
    return change < 0 ? 'text-green-600' : 'text-red-600';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600 animate-pulse" />
          Real-time Emission Monitoring
        </CardTitle>
        <CardDescription>
          Live tracking of your carbon footprint changes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-medium">Current Emissions</span>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {data.currentEmissions.toFixed(0)} kg
            </div>
            <div className="text-xs text-blue-600">CO₂ equivalent</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-600 font-medium">Weekly Change</span>
              {React.createElement(getChangeIcon(data.weeklyChange), {
                className: `h-4 w-4 ${getChangeColor(data.weeklyChange)}`
              })}
            </div>
            <div className={`text-2xl font-bold ${getChangeColor(data.weeklyChange)}`}>
              {data.weeklyChange > 0 ? '+' : ''}{data.weeklyChange.toFixed(1)}%
            </div>
            <div className="text-xs text-green-600">vs last week</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-600 font-medium">Monthly Progress</span>
              {React.createElement(getChangeIcon(data.monthlyChange), {
                className: `h-4 w-4 ${getChangeColor(data.monthlyChange)}`
              })}
            </div>
            <div className={`text-2xl font-bold ${getChangeColor(data.monthlyChange)}`}>
              {data.monthlyChange > 0 ? '+' : ''}{data.monthlyChange.toFixed(1)}%
            </div>
            <div className="text-xs text-purple-600">vs last month</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-600 font-medium">Goal Progress</span>
              <Bell className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-700">
              {data.goalProgress.toFixed(0)}%
            </div>
            <div className="text-xs text-yellow-600">of annual target</div>
          </div>
        </div>

        {/* Live Alerts */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Live Alerts
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {data.alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-start gap-3 p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getAlertBadge(alert.type)}`}
                    >
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-3">System Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Data Collection: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Analysis Engine: Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Alerts: Enabled</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
