
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Leaf, MapPin, Star, ShoppingCart, CheckCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface OffsetProject {
  id: string;
  name: string;
  type: string;
  location: string;
  pricePerTon: number;
  rating: number;
  description: string;
  verified: boolean;
  impact: string;
}

export const CarbonOffsetMarketplace = () => {
  const [cart, setCart] = useState<{ project: OffsetProject; tons: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  const projects: OffsetProject[] = [
    {
      id: "1",
      name: "Amazon Rainforest Conservation",
      type: "Forest Conservation",
      location: "Brazil",
      pricePerTon: 15,
      rating: 4.8,
      description: "Protecting 10,000 hectares of pristine Amazon rainforest",
      verified: true,
      impact: "Prevents deforestation and protects biodiversity"
    },
    {
      id: "2",
      name: "Solar Energy Project",
      type: "Renewable Energy",
      location: "India",
      pricePerTon: 12,
      rating: 4.6,
      description: "Large-scale solar installation providing clean energy",
      verified: true,
      impact: "Replaces coal-fired electricity generation"
    },
    {
      id: "3",
      name: "Community Cookstoves",
      type: "Energy Efficiency",
      location: "Kenya",
      pricePerTon: 18,
      rating: 4.9,
      description: "Efficient cookstoves reducing wood consumption",
      verified: true,
      impact: "Reduces deforestation and improves health"
    },
    {
      id: "4",
      name: "Methane Capture Project",
      type: "Waste Management",
      location: "USA",
      pricePerTon: 22,
      rating: 4.7,
      description: "Capturing methane from landfills for energy",
      verified: true,
      impact: "Prevents methane emissions and generates clean energy"
    }
  ];

  const addToCart = (project: OffsetProject, tons: number = 1) => {
    const existingItem = cart.find(item => item.project.id === project.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.project.id === project.id 
          ? { ...item, tons: item.tons + tons }
          : item
      ));
    } else {
      setCart([...cart, { project, tons }]);
    }
    
    toast.success(`Added ${tons} ton(s) of ${project.name} to cart`);
  };

  const removeFromCart = (projectId: string) => {
    setCart(cart.filter(item => item.project.id !== projectId));
    toast.success("Removed from cart");
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + (item.project.pricePerTon * item.tons), 0);
  };

  const getTotalOffset = () => {
    return cart.reduce((total, item) => total + item.tons, 0);
  };

  const handlePurchase = () => {
    // Simulate purchase process
    setTimeout(() => {
      setPurchaseComplete(true);
      setCart([]);
      toast.success("Carbon offsets purchased successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              Your Carbon Offset Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.project.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <p className="font-medium">{item.project.name}</p>
                    <p className="text-sm text-gray-600">{item.tons} tons at ${item.project.pricePerTon}/ton</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${item.project.pricePerTon * item.tons}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.project.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-lg font-semibold">
                    {getTotalOffset()} tons CO2 offset
                  </p>
                  <p className="text-sm text-gray-600">
                    {cart.length} project{cart.length > 1 ? 's' : ''} selected
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${getTotalCost()}
                  </p>
                  <Button 
                    className="mt-2 bg-green-600 hover:bg-green-700"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    {project.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </CardDescription>
                </div>
                {project.verified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{project.type}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{project.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{project.description}</p>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Impact:</p>
                <p className="text-sm text-blue-700">{project.impact}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${project.pricePerTon}
                  </p>
                  <p className="text-sm text-gray-600">per ton CO2</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(project, 1)}
                  >
                    1 ton
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(project, 5)}
                  >
                    5 tons
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addToCart(project, 10)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    10 tons
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription>
              Review your carbon offset purchase
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total CO2 Offset:</span>
                <span className="text-lg font-bold text-green-600">{getTotalOffset()} tons</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="text-xl font-bold text-green-600">${getTotalCost()}</span>
              </div>
            </div>
            
            {purchaseComplete ? (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">Purchase Complete!</h3>
                <p className="text-sm text-gray-600">
                  Your carbon offset certificates will be sent to your email.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  By purchasing these offsets, you're supporting verified climate projects and reducing your carbon footprint.
                </p>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is a demo. In a real application, you would integrate with a payment processor.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {!purchaseComplete ? (
              <>
                <Button variant="outline" onClick={() => setShowCheckout(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handlePurchase}
                >
                  Complete Purchase
                </Button>
              </>
            ) : (
              <Button onClick={() => {
                setShowCheckout(false);
                setPurchaseComplete(false);
              }}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
