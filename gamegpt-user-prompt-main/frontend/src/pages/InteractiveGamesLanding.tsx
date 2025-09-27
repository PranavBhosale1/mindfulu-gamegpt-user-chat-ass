import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveGamesLayout } from "@/components/InteractiveGamesLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Target, 
  Sparkles, 
  Heart, 
  Brain, 
  Users, 
  Star,
  ArrowRight,
  Play,
  Wand2,
  Trophy,
  Zap
} from "lucide-react";

export default function InteractiveGamesLanding() {
  const navigate = useNavigate();

  const gameFeatures = [
    {
      icon: Target,
      title: "Challenge Games",
      description: "Interactive behavioral challenges designed to boost your mood and reduce stress",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      action: () => navigate("/challenge")
    },
    {
      icon: Gamepad2,
      title: "AI Game Creator",
      description: "Create personalized wellness games tailored to your specific needs and preferences",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      action: () => navigate("/dynamic")
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Cognitive Enhancement",
      description: "Improve focus, memory, and problem-solving skills"
    },
    {
      icon: Heart,
      title: "Emotional Wellness",
      description: "Develop healthy coping strategies and emotional regulation"
    },
    {
      icon: Users,
      title: "Social Connection",
      description: "Build confidence and improve interpersonal skills"
    },
    {
      icon: Trophy,
      title: "Personal Growth",
      description: "Track progress and celebrate achievements"
    }
  ];

  const stats = [
    { label: "Games Available", value: "50+", icon: Gamepad2 },
    { label: "Happy Users", value: "10K+", icon: Users },
    { label: "Success Rate", value: "95%", icon: Star },
    { label: "Avg. Rating", value: "4.8/5", icon: Heart }
  ];

  return (
    <InteractiveGamesLayout currentPage="landing">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Play className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Interactive Activities
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Engage in fun and helpful exercises designed to boost your mood and reduce stress. 
            Experience personalized wellness games that adapt to your needs.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
                <stat.icon className="w-5 h-5 text-purple-600" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Game Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {gameFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.bgColor} ${feature.borderColor} border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              onClick={feature.action}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <div>
                    <CardTitle className={`text-2xl font-bold ${feature.color}`}>
                      {feature.title}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      <Zap className="w-3 h-3 mr-1" />
                      Interactive
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                <Button 
                  className={`w-full h-12 text-lg font-semibold ${feature.color.includes('emerald') ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-purple-600 hover:bg-purple-700'} text-white group-hover:scale-105 transition-transform`}
                  onClick={feature.action}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Interactive Activities?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
            <CardContent className="py-12">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Wellness Journey?
              </h2>
              
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who have transformed their mental wellness through our interactive activities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => navigate("/challenge")}
                >
                  <Target className="w-5 h-5 mr-2" />
                  Try Challenges
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                  onClick={() => navigate("/dynamic")}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Create Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </InteractiveGamesLayout>
  );
}
