
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, Car, Plane, Home } from "lucide-react";
import { toast } from "sonner";

export const OffsetCalculator = () => {
  const [calculationType, setCalculationType] = useState("custom");
  const [customEmissions, setCustomEmissions] = useState("");
  const [carMiles, setCarMiles] = useState("");
  const [flightHours, setFlightHours] = useState("");
  const [homeEnergy, setHomeEnergy] = useState("");
  const [results, setResults] = useState<{
    totalEmissions: number;
    offsetCost: number;
    trees: number;
  } | null>(null);

  const calculateOffsets = () => {
    let totalEmissions = 0;

    switch (calculationType) {
      case "custom":
        totalEmissions = Number(customEmissions) || 0;
        break;
      case "transport":
        const carEmissions = (Number(carMiles) || 0) * 0.4; // kg CO2 per mile
        const flightEmissions = (Number(flightHours) || 0) * 250; // kg CO2 per hour
        totalEmissions = carEmissions + flightEmissions;
        break;
      case "home":
        totalEmissions = (Number(homeEnergy) || 0) * 12; // annual estimate
        break;
      default:
        totalEmissions = 0;
    }

    if (totalEmissions > 0) {
      const offsetCost = totalEmissions * 0.02; // $0.02 per kg CO2
      const trees = Math.ceil(totalEmissions / 22); // trees needed (22kg CO2 per tree/year)
      
      setResults({
        totalEmissions,
        offsetCost,
        trees
      });
      
      toast.success("Offset calculation completed!");
    } else {
      toast.error("Please enter valid values");
    }
  };

  const resetCalculator = () => {
    setCustomEmissions("");
    setCarMiles("");
    setFlightHours("");
    setHomeEnergy("");
    setResults(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Carbon Offset Calculator
        </CardTitle>
        <CardDescription>
          Calculate the exact amount of offsets needed for carbon neutrality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="calc-type">Calculation Type</Label>
          <Select value={calculationType} onValueChange={setCalculationType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">Custom Emissions</SelectItem>
              <SelectItem value="transport">Transportation</SelectItem>
              <SelectItem value="home">Home Energy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {calculationType === "custom" && (
          <div>
            <Label htmlFor="custom-emissions">Total Emissions (kg CO₂)</Label>
            <Input
              id="custom-emissions"
              type="number"
              value={customEmissions}
              onChange={(e) => setCustomEmissions(e.target.value)}
              placeholder="Enter your total emissions"
            />
          </div>
        )}

        {calculationType === "transport" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="car-miles" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Car Miles per Year
              </Label>
              <Input
                id="car-miles"
                type="number"
                value={carMiles}
                onChange={(e) => setCarMiles(e.target.value)}
                placeholder="e.g., 12000"
              />
            </div>
            <div>
              <Label htmlFor="flight-hours" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Flight Hours per Year
              </Label>
              <Input
                id="flight-hours"
                type="number"
                value={flightHours}
                onChange={(e) => setFlightHours(e.target.value)}
                placeholder="e.g., 20"
              />
            </div>
          </div>
        )}

        {calculationType === "home" && (
          <div>
            <Label htmlFor="home-energy" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Monthly Energy Usage (kWh)
            </Label>
            <Input
              id="home-energy"
              type="number"
              value={homeEnergy}
              onChange={(e) => setHomeEnergy(e.target.value)}
              placeholder="e.g., 800"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={calculateOffsets} className="flex-1">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Offsets
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            Reset
          </Button>
        </div>

        {results && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Your Carbon Footprint Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded border">
                <div className="text-2xl font-bold text-red-600">
                  {results.totalEmissions.toLocaleString()} kg
                </div>
                <div className="text-sm text-gray-600">CO₂ Emissions</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded border">
                <div className="text-2xl font-bold text-green-600">
                  ${results.offsetCost.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Offset Cost</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded border">
                <div className="text-2xl font-bold text-blue-600">
                  {results.trees}
                </div>
                <div className="text-sm text-gray-600">Trees Equivalent</div>
              </div>
            </div>

            <div className="bg-green-100 p-3 rounded border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Recommendation:</strong> To achieve carbon neutrality, you need to offset{" "}
                {results.totalEmissions.toLocaleString()} kg of CO₂. This is equivalent to planting{" "}
                {results.trees} trees or costs approximately ${results.offsetCost.toFixed(2)} in carbon offsets.
              </p>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Purchase {results.totalEmissions.toLocaleString()} kg CO₂ Offsets
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
