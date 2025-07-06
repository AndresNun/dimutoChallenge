import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, BarChart3, Users, Globe, Target, Heart, TreePine, Shield, Play, ArrowRight, CheckCircle, TrendingUp, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import TreeLogo from "@/components/TreeLogo";
const Index = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <TreeLogo />
              <span className="text-2xl font-bold text-gray-900">CarbonTrace</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/carbontrace">
                <Button variant="default" className="bg-green-600 hover:bg-green-700">
                  CarbonTrace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Attention-Grabbing Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <Award className="h-5 w-5" />
            <span>🎉 New: AI-Powered Carbon Reduction Suggestions Now Available!</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Your Product's
            <span className="text-green-600 block">Carbon Footprint</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Visualize and analyze carbon emissions across your entire supply chain. 
            Make data-driven decisions to reduce environmental impact and build sustainable operations.
          </p>
          
          {/* Interactive Demo Section */}
          <div className="mb-8">
            <Card className="max-w-2xl mx-auto border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      {!playingVideo ? <Play className="h-8 w-8 text-white ml-1" /> : <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent" />}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">See CarbonTrace in Action</h3>
                <p className="text-gray-600 mb-4">Watch how companies reduce emissions by 20% in 6 months</p>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700" onClick={() => setPlayingVideo(!playingVideo)}>
                  {playingVideo ? 'Stop Demo' : 'Watch 2-Minute Demo'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/carbontrace">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <BarChart3 className="mr-2 h-5 w-5" />
                View CarbonTrace
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => setShowLearnMore(!showLearnMore)}>
              <Globe className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Live Statistics Bar */}
      <div className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div className="text-3xl font-bold text-gray-900">1,247</div>
              </div>
              <p className="text-sm text-gray-600">Companies Tracking</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="h-5 w-5 text-teal-600" />
                <div className="text-3xl font-bold text-gray-900">2.3M</div>
              </div>
              <p className="text-sm text-gray-600">Tons CO₂ Reduced</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5 text-cyan-600" />
                <div className="text-3xl font-bold text-gray-900">42%</div>
              </div>
              <p className="text-sm text-gray-600">Average Reduction</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div className="text-3xl font-bold text-gray-900">98%</div>
              </div>
              <p className="text-sm text-gray-600">Goal Achievement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      {showLearnMore && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white/50 backdrop-blur-sm rounded-lg mx-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Carbon Tracking Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Climate change is one of the most critical challenges of our time. 
              Every company has the responsibility and opportunity to contribute to a sustainable future.
            </p>
          </div>

          {/* Mission & Objective */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4 text-green-700">Primary Objective</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Democratize access to carbon measurement tools so that any company, 
                    regardless of size, can understand and effectively reduce their environmental impact.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Future Vision</h4>
                  <p className="text-gray-600 leading-relaxed">
                    A world where every business decision considers its environmental impact, 
                    creating more sustainable supply chains and a healthier planet for future generations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Stay ahead of environmental regulations and maintain compliance with international standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Social Responsibility</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Demonstrate your environmental commitment and attract sustainability-conscious consumers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Cost Reduction</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Identify inefficiencies in your supply chain that generate both emissions and unnecessary costs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">Competitive Advantage</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Differentiate yourself in the market with more sustainable products and services than competitors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact & Contribution */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8">
            <div className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h3 className="text-3xl font-bold mb-6">Your Contribution to the Planet</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">2030</div>
                  <p className="text-green-100">Global emission reduction target</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">70%</div>
                  <p className="text-green-100">Of emissions come from supply chains</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">+50%</div>
                  <p className="text-green-100">Reduction possible with effective measurement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Time to Act is Now
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Every day without measurement is a missed opportunity to reduce your impact. 
              Join leading companies already building a more sustainable future.
            </p>
            <Link to="/carbontrace">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Now
              </Button>
            </Link>
          </div>
        </div>}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose CarbonTrace?
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive tools for sustainability professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Visual Analytics</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Interactive charts and graphs that make complex emissions data easy to understand and act upon.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Built for Professionals</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Designed specifically for sustainability analysts and supply chain managers who need actionable insights.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Get AI-powered suggestions to reduce emissions at every stage of your supply chain.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Reduce Your Carbon Footprint?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Start tracking your supply chain emissions today and make a positive environmental impact.
            </p>
            <Link to="/carbontrace">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <TreeLogo />
              <span className="text-xl font-bold">CarbonTrace</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 CarbonTrace. Building a sustainable future.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;