
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface EmissionData {
  stage: string;
  emissions: number;
  recommendation: string;
}

interface ProductComparisonData {
  product: string;
  totalEmissions: number;
}

interface DataExporterProps {
  emissionData: EmissionData[];
  comparisonData: ProductComparisonData[];
  selectedProduct: string;
}

export const DataExporter = ({ emissionData, comparisonData, selectedProduct }: DataExporterProps) => {
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const csvContent = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    ).join('\n');
    
    const csv = headers + '\n' + csvContent;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportEmissions = () => {
    exportToCSV(emissionData, `${selectedProduct}_emissions_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success("Emissions data exported successfully!");
  };

  const handleExportComparison = () => {
    exportToCSV(comparisonData, `product_comparison_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success("Comparison data exported successfully!");
  };

  const generateReport = () => {
    const totalEmissions = emissionData.reduce((sum, item) => sum + item.emissions, 0);
    const highestStage = emissionData.reduce((max, item) => item.emissions > max.emissions ? item : max);
    
    const report = `
CarbonTrace Emission Report
Generated: ${new Date().toLocaleDateString()}
Product: ${selectedProduct}

SUMMARY:
- Total Emissions: ${totalEmissions.toLocaleString()} kg CO2
- Number of Stages: ${emissionData.length}
- Highest Impact Stage: ${highestStage.stage} (${highestStage.emissions.toLocaleString()} kg CO2)

STAGE BREAKDOWN:
${emissionData.map(item => 
  `${item.stage}: ${item.emissions.toLocaleString()} kg CO2\nRecommendation: ${item.recommendation}\n`
).join('\n')}

PRODUCT COMPARISON:
${comparisonData.map(item => 
  `${item.product}: ${item.totalEmissions.toLocaleString()} kg CO2`
).join('\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `carbonTrace_report_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Full report generated successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-blue-600" />
          Data Export
        </CardTitle>
        <CardDescription>
          Export your emission data for further analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button onClick={handleExportEmissions} variant="outline" className="w-full justify-start">
          <Download className="mr-2 h-4 w-4" />
          Export {selectedProduct} Emissions (CSV)
        </Button>
        <Button onClick={handleExportComparison} variant="outline" className="w-full justify-start">
          <Download className="mr-2 h-4 w-4" />
          Export Product Comparison (CSV)
        </Button>
        <Button onClick={generateReport} className="w-full justify-start bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Generate Full Report (TXT)
        </Button>
      </CardContent>
    </Card>
  );
};
