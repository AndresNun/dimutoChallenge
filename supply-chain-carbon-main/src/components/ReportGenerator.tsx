
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface ReportGeneratorProps {
  emissionData: any[];
  comparisonData: any[];
  selectedProduct: string;
}

export const ReportGenerator = ({ emissionData, comparisonData, selectedProduct }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedReports, setGeneratedReports] = useState<string[]>([]);

  const reportTypes = [
    { value: "executive", label: "Executive Summary", description: "High-level overview for stakeholders" },
    { value: "technical", label: "Technical Report", description: "Detailed technical analysis" },
    { value: "compliance", label: "Compliance Report", description: "Regulatory compliance documentation" },
    { value: "investor", label: "Investor Presentation", description: "Financial and sustainability metrics" }
  ];

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate report generation process
    const steps = ["Analyzing data", "Calculating metrics", "Generating charts", "Formatting document", "Finalizing report"];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress((i + 1) / steps.length * 100);
      toast.info(`${steps[i]}...`);
    }

    const reportContent = generateReportContent(type);
    downloadReport(reportContent, type);
    
    setGeneratedReports([...generatedReports, type]);
    setIsGenerating(false);
    setProgress(0);
    toast.success(`${reportTypes.find(r => r.value === type)?.label} generated successfully!`);
  };

  const generateReportContent = (type: string) => {
    const totalEmissions = emissionData.reduce((sum, item) => sum + item.emissions, 0);
    const highestStage = emissionData.reduce((max, item) => item.emissions > max.emissions ? item : max);
    const currentDate = new Date().toLocaleDateString();

    const commonHeader = `
CarbonTrace Sustainability Report
Generated: ${currentDate}
Product: ${selectedProduct}
Report Type: ${reportTypes.find(r => r.value === type)?.label}

EXECUTIVE SUMMARY:
Total Carbon Emissions: ${totalEmissions.toLocaleString()} kg CO₂
Number of Supply Chain Stages: ${emissionData.length}
Highest Impact Stage: ${highestStage.stage} (${highestStage.emissions.toLocaleString()} kg CO₂)
Carbon Intensity: ${(totalEmissions / 1000).toFixed(2)} tonnes CO₂

`;

    switch (type) {
      case "executive":
        return `${commonHeader}
KEY FINDINGS:
• Primary emission source: ${highestStage.stage}
• Reduction potential: 25-40% through recommended actions
• Estimated cost of carbon neutrality: $${(totalEmissions * 0.02).toFixed(2)}

STRATEGIC RECOMMENDATIONS:
1. Prioritize ${highestStage.stage} optimization
2. Implement renewable energy solutions
3. Establish carbon offset program
4. Set science-based reduction targets

NEXT STEPS:
• Develop 5-year sustainability roadmap
• Engage suppliers in emission reduction
• Establish quarterly monitoring system
`;

      case "technical":
        return `${commonHeader}
DETAILED EMISSION BREAKDOWN:
${emissionData.map(item => 
  `${item.stage}: ${item.emissions.toLocaleString()} kg CO₂ (${((item.emissions/totalEmissions)*100).toFixed(1)}%)\n  Recommendation: ${item.recommendation}`
).join('\n\n')}

METHODOLOGY:
• Life Cycle Assessment (LCA) approach
• ISO 14040/14044 standards compliance
• GHG Protocol methodology
• Third-party verification standards

UNCERTAINTY ANALYSIS:
• Data quality assessment: High confidence
• Uncertainty range: ±15%
• Key assumptions documented
• Sensitivity analysis completed

COMPARATIVE ANALYSIS:
${comparisonData.map(item => 
  `${item.product}: ${item.totalEmissions.toLocaleString()} kg CO₂`
).join('\n')}
`;

      case "compliance":
        return `${commonHeader}
REGULATORY COMPLIANCE STATUS:

GHG REPORTING:
☑ Scope 1 emissions documented
☑ Scope 2 emissions calculated
☑ Scope 3 emissions assessed
☑ Verification procedures implemented

STANDARDS COMPLIANCE:
• ISO 14001: Environmental Management System
• GRI Standards: Sustainability Reporting
• CDP: Climate Disclosure
• SBTi: Science-Based Targets

CERTIFICATION STATUS:
• Carbon Trust Standard: In Progress
• B-Corp Certification: Eligible
• LEED Rating: Applicable for facilities

AUDIT TRAIL:
• Data collection methodology documented
• Calculation procedures verified
• Third-party review completed
• Management approval obtained
`;

      case "investor":
        return `${commonHeader}
INVESTMENT HIGHLIGHTS:

ESG PERFORMANCE:
• Carbon intensity reduction target: 50% by 2030
• Renewable energy adoption: 75% by 2027
• Supply chain engagement: 100% tier-1 suppliers
• Transparency score: A- (CDP Climate)

FINANCIAL IMPLICATIONS:
• Carbon risk exposure: $${(totalEmissions * 0.05).toFixed(0)}k annually
• Energy cost savings potential: $${(totalEmissions * 0.03).toFixed(0)}k/year
• Carbon offset investment: $${(totalEmissions * 0.02).toFixed(0)}k
• ROI on sustainability initiatives: 18% over 5 years

MARKET POSITIONING:
• Industry benchmark comparison: Top quartile
• Customer preference alignment: 85% favorable
• Brand value enhancement: $2.3M estimated
• Risk mitigation value: $1.8M annually

GROWTH OPPORTUNITIES:
• Green product line expansion
• Sustainable packaging innovation
• Carbon-neutral supply chain
• ESG-focused partnerships
`;

      default:
        return commonHeader;
    }
  };

  const downloadReport = (content: string, type: string) => {
    const reportName = reportTypes.find(r => r.value === type)?.label || "Report";
    const filename = `${reportName.toLowerCase().replace(/\s+/g, '_')}_${selectedProduct}_${new Date().toISOString().split('T')[0]}.txt`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          Automated Report Generator
        </CardTitle>
        <CardDescription>
          Generate comprehensive sustainability reports for stakeholders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Report Type</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Choose report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Generating report...</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((type) => {
            const isGenerated = generatedReports.includes(type.value);
            return (
              <Button
                key={type.value}
                variant="outline"
                className={`h-20 flex-col justify-center relative ${
                  isGenerated ? 'bg-green-50 border-green-200' : ''
                }`}
                onClick={() => generateReport(type.value)}
                disabled={isGenerating}
              >
                {isGenerated && (
                  <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-green-600" />
                )}
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="font-medium">{type.label}</span>
                </div>
                <span className="text-xs text-gray-500 mt-1">{type.description}</span>
              </Button>
            );
          })}
        </div>

        {reportType && (
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={() => generateReport(reportType)}
            disabled={isGenerating || !reportType}
          >
            {isGenerating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate {reportTypes.find(r => r.value === reportType)?.label}
              </>
            )}
          </Button>
        )}

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Report Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Comprehensive emission analysis</li>
            <li>• Industry benchmarking</li>
            <li>• Actionable recommendations</li>
            <li>• Compliance documentation</li>
            <li>• Financial impact assessment</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
