
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Target, Award, TrendingDown, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  targetReduction: number;
  timeframe: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  benefits: string[];
  requirements: string[];
}

interface GoalTemplatesProps {
  onApplyTemplate: (template: GoalTemplate) => void;
}

export const GoalTemplates = ({ onApplyTemplate }: GoalTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const templates: GoalTemplate[] = [
    {
      id: "net-zero-2030",
      title: "Net Zero by 2030",
      description: "Achieve carbon neutrality through emission reduction and offsets",
      targetReduction: 100,
      timeframe: 72,
      difficulty: 'Hard',
      category: 'Climate Action',
      benefits: [
        "Complete carbon neutrality",
        "Industry leadership position",
        "Enhanced brand reputation",
        "Future-proof business model"
      ],
      requirements: [
        "Comprehensive emission audit",
        "Science-based targets",
        "Supply chain engagement",
        "Carbon offset strategy"
      ]
    },
    {
      id: "sbti-target",
      title: "Science-Based Target (SBTi)",
      description: "Set targets aligned with climate science to limit global warming",
      targetReduction: 50,
      timeframe: 60,
      difficulty: 'Medium',
      category: 'Science-Based',
      benefits: [
        "Credible climate commitment",
        "Investor confidence",
        "Risk mitigation",
        "Cost savings from efficiency"
      ],
      requirements: [
        "SBTi methodology compliance",
        "1.5°C pathway alignment",
        "Scope 1, 2, and 3 targets",
        "Annual progress reporting"
      ]
    },
    {
      id: "renewable-energy",
      title: "100% Renewable Energy",
      description: "Transition to renewable energy sources across operations",
      targetReduction: 40,
      timeframe: 36,
      difficulty: 'Medium',
      category: 'Energy Transition',
      benefits: [
        "Stable energy costs",
        "Reduced carbon footprint",
        "Energy independence",
        "Green marketing opportunities"
      ],
      requirements: [
        "Energy audit and planning",
        "Renewable energy procurement",
        "Infrastructure upgrades",
        "Power purchase agreements"
      ]
    },
    {
      id: "quick-wins",
      title: "Quick Efficiency Gains",
      description: "Achieve immediate emission reductions through efficiency measures",
      targetReduction: 20,
      timeframe: 12,
      difficulty: 'Easy',
      category: 'Energy Efficiency',
      benefits: [
        "Fast implementation",
        "Immediate cost savings",
        "Low investment required",
        "Foundation for bigger goals"
      ],
      requirements: [
        "Energy efficiency audit",
        "Equipment upgrades",
        "Staff training",
        "Monitoring systems"
      ]
    },
    {
      id: "supply-chain",
      title: "Sustainable Supply Chain",
      description: "Engage suppliers to reduce Scope 3 emissions",
      targetReduction: 35,
      timeframe: 48,
      difficulty: 'Hard',
      category: 'Supply Chain',
      benefits: [
        "Comprehensive impact reduction",
        "Supply chain resilience",
        "Stakeholder engagement",
        "Competitive advantage"
      ],
      requirements: [
        "Supplier emission assessment",
        "Engagement programs",
        "Procurement policy updates",
        "Regular monitoring"
      ]
    },
    {
      id: "circular-economy",
      title: "Circular Economy Model",
      description: "Implement circular principles to minimize waste and emissions",
      targetReduction: 30,
      timeframe: 60,
      difficulty: 'Hard',
      category: 'Circular Economy',
      benefits: [
        "Waste reduction",
        "Resource efficiency",
        "New revenue streams",
        "Innovation opportunities"
      ],
      requirements: [
        "Circular design principles",
        "Waste stream analysis",
        "Partnership development",
        "Business model innovation"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApplyTemplate = (template: GoalTemplate) => {
    onApplyTemplate(template);
    setShowDialog(false);
    toast.success(`Applied template: ${template.title}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Goal Templates
          </CardTitle>
          <CardDescription>
            Pre-built sustainability goals based on industry standards and best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-green-200"
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowDialog(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm leading-tight">{template.title}</h3>
                      <Badge 
                        variant="secondary" 
                        className={getDifficultyColor(template.difficulty)}
                      >
                        {template.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3 text-green-600" />
                          {template.targetReduction}% reduction
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-blue-600" />
                          {template.timeframe} months
                        </span>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    
                    <Button size="sm" className="w-full text-xs">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  {selectedTemplate.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedTemplate.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedTemplate.targetReduction}%
                    </div>
                    <div className="text-xs text-gray-600">Reduction Target</div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedTemplate.timeframe}
                    </div>
                    <div className="text-xs text-gray-600">Months</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Badge className={getDifficultyColor(selectedTemplate.difficulty)}>
                      {selectedTemplate.difficulty}
                    </Badge>
                    <div className="text-xs text-gray-600 mt-1">Difficulty</div>
                  </div>
                  
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm font-bold text-yellow-600">
                      {selectedTemplate.category}
                    </div>
                    <div className="text-xs text-gray-600">Category</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedTemplate.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {selectedTemplate.requirements.map((requirement, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">Implementation Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Phase 1: Planning & Assessment</span>
                      <span className="text-gray-600">Months 1-{Math.round(selectedTemplate.timeframe * 0.2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phase 2: Implementation</span>
                      <span className="text-gray-600">Months {Math.round(selectedTemplate.timeframe * 0.2) + 1}-{Math.round(selectedTemplate.timeframe * 0.8)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phase 3: Monitoring & Optimization</span>
                      <span className="text-gray-600">Months {Math.round(selectedTemplate.timeframe * 0.8) + 1}-{selectedTemplate.timeframe}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApplyTemplate(selectedTemplate)}
                >
                  Apply This Template
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
