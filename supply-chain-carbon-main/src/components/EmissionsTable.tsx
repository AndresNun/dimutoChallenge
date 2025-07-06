
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EmissionData {
  stage: string;
  emissions: number;
  recommendation: string;
}

interface EmissionsTableProps {
  data: EmissionData[];
}

export const EmissionsTable = ({ data }: EmissionsTableProps) => {
  const totalEmissions = data.reduce((sum, item) => sum + item.emissions, 0);
  
  const getEmissionLevel = (emissions: number) => {
    const maxEmissions = Math.max(...data.map(d => d.emissions));
    const percentage = (emissions / maxEmissions) * 100;
    
    if (percentage >= 80) return { level: "Critical", color: "destructive", icon: AlertTriangle };
    if (percentage >= 50) return { level: "High", color: "default", icon: TrendingUp };
    return { level: "Low", color: "secondary", icon: CheckCircle };
  };

  const getImpactPercentage = (emissions: number) => {
    return (emissions / totalEmissions) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Table */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-green-600" />
            Emissions Analysis by Stage
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-semibold">Supply Chain Stage</TableHead>
                <TableHead className="text-center font-semibold">Emissions (kg CO₂)</TableHead>
                <TableHead className="text-center font-semibold">Impact Level</TableHead>
                <TableHead className="text-center font-semibold">% of Total</TableHead>
                <TableHead className="font-semibold">Progress Bar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const emissionLevel = getEmissionLevel(item.emissions);
                const percentage = getImpactPercentage(item.emissions);
                const Icon = emissionLevel.icon;
                
                return (
                  <TableRow key={index} className="hover:bg-green-50/30 transition-colors">
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        {item.stage}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-mono text-lg font-semibold text-gray-800">
                        {item.emissions.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={emissionLevel.color as any}
                        className="flex items-center gap-1 justify-center"
                      >
                        <Icon className="h-3 w-3" />
                        {emissionLevel.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-medium text-gray-600">
                        {percentage.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={percentage} 
                          className="h-2 flex-1"
                        />
                        <span className="text-xs text-gray-500 w-10">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations Section */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            AI-Powered Reduction Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {data.map((item, index) => {
              const emissionLevel = getEmissionLevel(item.emissions);
              const Icon = emissionLevel.icon;
              
              return (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{item.stage}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.emissions.toLocaleString()} kg CO₂
                        </Badge>
                      </div>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {item.recommendation}
                      </p>
                      <div className="mt-2 text-xs text-blue-600">
                        Potential reduction: 15-30% emissions
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
