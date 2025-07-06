
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calculator, Target } from "lucide-react";

interface EmissionReductionCalculatorProps {
  currentEmissions: number;
}

export const EmissionReductionCalculator = ({ currentEmissions }: EmissionReductionCalculatorProps) => {
  const [targetReduction, setTargetReduction] = useState(20);
  const [timeframe, setTimeframe] = useState(12);

  const targetEmissions = currentEmissions * (1 - targetReduction / 100);
  const monthlyReduction = (currentEmissions - targetEmissions) / timeframe;
  const progressPercentage = Math.min((targetReduction / 50) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-green-600" />
          Emission Reduction Calculator
        </CardTitle>
        <CardDescription>
          Set reduction goals and track progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="target">Target Reduction (%)</Label>
            <Input
              id="target"
              type="number"
              value={targetReduction}
              onChange={(e) => setTargetReduction(Number(e.target.value))}
              min="1"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="timeframe">Timeframe (months)</Label>
            <Input
              id="timeframe"
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Emissions:</span>
            <span className="font-semibold">{currentEmissions.toLocaleString()} kg CO2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Target Emissions:</span>
            <span className="font-semibold text-green-600">{targetEmissions.toLocaleString()} kg CO2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly Reduction Needed:</span>
            <span className="font-semibold text-blue-600">{monthlyReduction.toLocaleString()} kg CO2</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Progress to 50% Reduction Goal</Label>
            <span className="text-sm text-gray-600">{targetReduction}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Impact Summary</span>
          </div>
          <p className="text-sm text-green-700">
            Achieving this {targetReduction}% reduction would save {(currentEmissions - targetEmissions).toLocaleString()} kg CO2 
            over {timeframe} months, equivalent to removing a car from the road for {Math.round((currentEmissions - targetEmissions) / 4600)} months.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
