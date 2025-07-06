
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface EmissionData {
  stage: string;
  emissions: number;
  recommendation: string;
}

interface EmissionAlertsProps {
  data: EmissionData[];
}

export const EmissionAlerts = ({ data }: EmissionAlertsProps) => {
  const totalEmissions = data.reduce((sum, item) => sum + item.emissions, 0);
  const averageEmissions = totalEmissions / data.length;
  
  const criticalStages = data.filter(item => item.emissions > averageEmissions * 1.5);
  const moderateStages = data.filter(item => item.emissions > averageEmissions && item.emissions <= averageEmissions * 1.5);
  const lowStages = data.filter(item => item.emissions <= averageEmissions);

  const getAlertLevel = (emissions: number) => {
    if (emissions > averageEmissions * 1.5) return "critical";
    if (emissions > averageEmissions) return "moderate";
    return "low";
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "moderate": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "critical": return "destructive";
      case "moderate": return "default";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Emission Alerts
        </CardTitle>
        <CardDescription>
          Monitor stages that need immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{criticalStages.length}</div>
              <div className="text-sm text-red-700">Critical</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{moderateStages.length}</div>
              <div className="text-sm text-yellow-700">Moderate</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{lowStages.length}</div>
              <div className="text-sm text-green-700">Low Impact</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Stage Alerts</h4>
            {data.map((item, index) => {
              const level = getAlertLevel(item.emissions);
              return (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(level)}
                    <span className="font-medium">{item.stage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {item.emissions.toLocaleString()} kg CO2
                    </span>
                    <Badge variant={getAlertColor(level) as any}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {criticalStages.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Immediate Action Required</span>
              </div>
              <p className="text-sm text-red-700">
                {criticalStages.length} stage{criticalStages.length > 1 ? 's' : ''} have emissions significantly above average. 
                Focus on: {criticalStages.map(stage => stage.stage).join(', ')}.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
