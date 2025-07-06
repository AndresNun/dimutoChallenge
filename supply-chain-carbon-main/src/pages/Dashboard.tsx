import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Plus, Lightbulb, Target, ShoppingCart, Calculator, FileText, Bell, Download, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { EmissionsChart } from "@/components/EmissionsChart";
import { EmissionsTable } from "@/components/EmissionsTable";
import { ProductComparisonChart } from "@/components/ProductComparisonChart";
import { toast } from "sonner";
import { EmissionReductionCalculator } from "@/components/EmissionReductionCalculator";
import { DataExporter } from "@/components/DataExporter";
import { EmissionAlerts } from "@/components/EmissionAlerts";
import { SustainabilityGoals } from "@/components/SustainabilityGoals";
import { CarbonOffsetMarketplace } from "@/components/CarbonOffsetMarketplace";
import { RealTimeMonitoring } from "@/components/RealTimeMonitoring";
import { OffsetCalculator } from "@/components/OffsetCalculator";
import { ReportGenerator } from "@/components/ReportGenerator";
import { GoalTemplates } from "@/components/GoalTemplates";
import TreeLogo from "@/components/TreeLogo";

// Sample data for different products
const productData = {
  coffee: [
    { stage: "Production", emissions: 1200, recommendation: "Switch to solar-powered equipment and sustainable farming practices." },
    { stage: "Packaging", emissions: 450, recommendation: "Use biodegradable materials and reduce packaging waste." },
    { stage: "Transport", emissions: 3000, recommendation: "Optimize delivery routes or switch to sea freight for long distances." },
    { stage: "Distribution", emissions: 1100, recommendation: "Consolidate urban deliveries and use electric vehicles." }
  ],
  mango: [
    { stage: "Production", emissions: 800, recommendation: "Implement precision agriculture and reduce water usage." },
    { stage: "Packaging", emissions: 300, recommendation: "Use compostable packaging and minimize plastic use." },
    { stage: "Transport", emissions: 2200, recommendation: "Use refrigerated containers with better insulation." },
    { stage: "Distribution", emissions: 900, recommendation: "Optimize cold chain logistics and reduce food waste." }
  ],
  cocoa: [
    { stage: "Production", emissions: 1500, recommendation: "Support sustainable cocoa farming and agroforestry." },
    { stage: "Packaging", emissions: 600, recommendation: "Switch to recyclable packaging materials." },
    { stage: "Transport", emissions: 2800, recommendation: "Consolidate shipments and use cleaner transportation methods." },
    { stage: "Distribution", emissions: 1200, recommendation: "Improve warehouse efficiency and reduce energy consumption." }
  ],
  avocado: [
    { stage: "Production", emissions: 950, recommendation: "Implement water-efficient irrigation and organic farming practices." },
    { stage: "Packaging", emissions: 380, recommendation: "Use recyclable cardboard and minimize plastic wrapping." },
    { stage: "Transport", emissions: 2600, recommendation: "Optimize cold chain transport and reduce air freight usage." },
    { stage: "Distribution", emissions: 1050, recommendation: "Improve cold storage efficiency and reduce food waste." }
  ]
};

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState("coffee");
  const [customData, setCustomData] = useState(productData[selectedProduct]);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStage, setNewStage] = useState({ stage: "", emissions: "", recommendation: "" });

  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    if (!isCustomMode) {
      setCustomData(productData[product]);
    }
  };

  const handleAddCustomStage = () => {
    if (!newStage.stage || !newStage.emissions || !newStage.recommendation) {
      toast.error("Please fill in all fields");
      return;
    }

    const newStageData = {
      stage: newStage.stage,
      emissions: parseInt(newStage.emissions),
      recommendation: newStage.recommendation
    };

    setCustomData([...customData, newStageData]);
    setNewStage({ stage: "", emissions: "", recommendation: "" });
    setIsDialogOpen(false);
    setIsCustomMode(true);
    toast.success("Custom stage added successfully!");
  };

  const handleResetToDefault = () => {
    setCustomData(productData[selectedProduct]);
    setIsCustomMode(false);
    toast.success("Reset to default data");
  };

  const handleApplyGoalTemplate = (template: any) => {
    toast.success(`Applied goal template: ${template.title}`);
    // Here you would integrate with your goal management system
  };

  const totalEmissions = customData.reduce((sum, item) => sum + item.emissions, 0);

  // Prepare data for product comparison chart
  const productComparisonData = [
    { 
      product: "Coffee", 
      totalEmissions: productData.coffee.reduce((sum, item) => sum + item.emissions, 0) 
    },
    { 
      product: "Mango", 
      totalEmissions: productData.mango.reduce((sum, item) => sum + item.emissions, 0) 
    },
    { 
      product: "Cocoa", 
      totalEmissions: productData.cocoa.reduce((sum, item) => sum + item.emissions, 0) 
    },
    { 
      product: "Avocado", 
      totalEmissions: productData.avocado.reduce((sum, item) => sum + item.emissions, 0) 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <TreeLogo />
              <span className="text-2xl font-bold text-gray-900">CarbonTrace</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                CarbonTrace
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Carbon Emissions Dashboard</h1>
          <p className="text-lg text-gray-600">Track and analyze emissions across your supply chain</p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="offsets" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Offsets
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Controls with Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="product-select" className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Product
                </Label>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">☕ Coffee</SelectItem>
                    <SelectItem value="mango">🥭 Mango</SelectItem>
                    <SelectItem value="cocoa">🍫 Cocoa</SelectItem>
                    <SelectItem value="avocado">🥑 Avocado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Custom Stage
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Custom Emission Stage</DialogTitle>
                      <DialogDescription>
                        Add a new stage to track emissions for your specific supply chain.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="stage">Stage Name</Label>
                        <Input
                          id="stage"
                          value={newStage.stage}
                          onChange={(e) => setNewStage({ ...newStage, stage: e.target.value })}
                          placeholder="e.g., Processing"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emissions">Emissions (kg CO2)</Label>
                        <Input
                          id="emissions"
                          type="number"
                          value={newStage.emissions}
                          onChange={(e) => setNewStage({ ...newStage, emissions: e.target.value })}
                          placeholder="e.g., 500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="recommendation">Recommendation</Label>
                        <Input
                          id="recommendation"
                          value={newStage.recommendation}
                          onChange={(e) => setNewStage({ ...newStage, recommendation: e.target.value })}
                          placeholder="e.g., Implement energy-efficient processes"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddCustomStage}>
                        Add Stage
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {isCustomMode && (
                  <Button variant="outline" onClick={handleResetToDefault}>
                    Reset to Default
                  </Button>
                )}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEmissions.toLocaleString()} kg CO2</div>
                  <p className="text-xs text-muted-foreground">
                    Across {customData.length} supply chain stages
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Impact Stage</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customData.reduce((max, item) => item.emissions > max.emissions ? item : max, customData[0])?.stage}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {customData.reduce((max, item) => item.emissions > max.emissions ? item : max, customData[0])?.emissions.toLocaleString()} kg CO2
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average per Stage</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(totalEmissions / customData.length).toLocaleString()} kg CO2
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per supply chain stage
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customData.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Actionable insights available
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <EmissionAlerts data={customData} />

            {/* Real-time Monitoring */}
            <RealTimeMonitoring />

            {/* Enhanced Product Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Product Sustainability Comparison
                </CardTitle>
                <CardDescription>
                  Comprehensive carbon emissions analysis with sustainability scoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductComparisonChart data={productComparisonData} />
              </CardContent>
            </Card>

            {/* Chart and Enhanced Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Emissions by Supply Chain Stage</CardTitle>
                  <CardDescription>
                    Carbon emissions (kg CO2) across different stages for {selectedProduct}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmissionsChart data={customData} />
                </CardContent>
              </Card>

              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Enhanced Analysis & AI Recommendations</CardTitle>
                  <CardDescription>
                    Detailed breakdown with intelligent reduction strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmissionsTable data={customData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sustainability Goals</h2>
              <p className="text-gray-600">Set and track your emission reduction targets</p>
            </div>
            
            <GoalTemplates onApplyTemplate={handleApplyGoalTemplate} />
            <SustainabilityGoals />
          </TabsContent>

          {/* Offsets Tab */}
          <TabsContent value="offsets" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Carbon Offset Marketplace</h2>
              <p className="text-gray-600">Purchase verified carbon offsets to neutralize your emissions</p>
            </div>
            
            <OffsetCalculator />
            <CarbonOffsetMarketplace />
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Tools</h2>
              <p className="text-gray-600">Advanced tools for emission analysis and reporting</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EmissionReductionCalculator currentEmissions={totalEmissions} />
              <DataExporter 
                emissionData={customData}
                comparisonData={productComparisonData}
                selectedProduct={selectedProduct}
              />
            </div>
            
            <ReportGenerator 
              emissionData={customData}
              comparisonData={productComparisonData}
              selectedProduct={selectedProduct}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
