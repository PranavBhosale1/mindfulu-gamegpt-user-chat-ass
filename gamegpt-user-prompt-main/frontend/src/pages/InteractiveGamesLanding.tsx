import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InteractiveGamesLayout } from "@/components/InteractiveGamesLayout";
import { 
  Gamepad2, 
  Sparkles, 
  Heart, 
  Brain, 
  Users, 
  Star,
  ArrowRight,
  Wand2,
  Trophy
} from "lucide-react";

export default function InteractiveGamesLanding() {
  const navigate = useNavigate();

  const gameFeatures = [
    {
      icon: Gamepad2,
      title: "AI Game Creator",
      description: "Create personalized wellness games tailored to your specific needs and preferences",
      emoji: "🎮",
      action: () => navigate("/dynamic")
    }
  ];

  return (
    <InteractiveGamesLayout currentPage="landing">
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-cream)]">
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <main className="relative mt-8">
            <section className="relative text-center pt-8 pb-16">
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter text-[var(--text-dark)] font-poppins">
                Interactive <span className="text-[var(--brand-purple)] bg-gradient-to-r from-[var(--brand-purple)] to-purple-700 bg-clip-text text-transparent">Activities</span> for your<br className="hidden sm:block" />
                <span className="text-[var(--brand-pink)] bg-gradient-to-r from-[var(--brand-pink)] to-pink-600 bg-clip-text text-transparent">Well-being</span>
              </h1>
              <p className="mt-8 max-w-3xl mx-auto text-[var(--text-medium)] leading-relaxed text-lg">
                Engage in fun and helpful exercises designed to boost your mood and reduce stress. 
                Experience personalized wellness games that adapt to your needs and help you grow.
              </p>
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => navigate("/dynamic")} 
                  className="px-8 py-3.5 rounded-full text-base font-bold bg-gradient-to-r from-[var(--brand-purple)] to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-purple-700 hover:to-purple-800"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your Game
                  </span>
                </button>
              </div>
            </section>

            <section className="py-16">
              <div className="text-center">
                <h2 className="font-extrabold text-3xl sm:text-4xl text-[var(--text-dark)]">Your Personal Toolkit for Well-being</h2>
                <p className="font-caveat text-4xl sm:text-5xl text-[var(--brand-yellow)] -mt-2">Always Here for You</p>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { emoji: '🎮', title: 'AI Game Creator', text: 'Create personalized wellness games tailored to your specific needs and preferences.', color: 'from-purple-500 to-purple-600' },
                  { emoji: '🧠', title: 'Cognitive Enhancement', text: 'Improve focus, memory, and problem-solving skills through interactive challenges.', color: 'from-blue-500 to-blue-600' },
                  { emoji: '❤️', title: 'Emotional Wellness', text: 'Develop healthy coping strategies and emotional regulation techniques.', color: 'from-pink-500 to-pink-600' },
                  { emoji: '🏆', title: 'Personal Growth', text: 'Track progress and celebrate achievements in your wellness journey.', color: 'from-green-500 to-green-600' },
                ].map((feature) => (
                  <div 
                    key={feature.title} 
                    className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group" 
                    onClick={() => feature.title === 'AI Game Creator' ? navigate("/dynamic") : null}
                  >
                    <div className={`mx-auto bg-gradient-to-br ${feature.color} size-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{feature.emoji}</span>
                    </div>
                    <h3 className="font-bold text-xl text-[var(--text-dark)] mt-5 font-poppins">{feature.title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-medium)] leading-relaxed">{feature.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-[var(--brand-purple)] via-purple-600 to-[var(--brand-pink)] my-16 rounded-3xl text-center text-white py-16 px-8 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl font-poppins mb-6">Ready to prioritize your well-being?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-white/90 leading-relaxed text-lg">
                  Join thousands of users who have transformed their mental wellness through our interactive activities.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => navigate("/dynamic")} 
                    className="px-8 py-4 rounded-full text-base font-bold bg-white text-[var(--brand-purple)] shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Your Game
                    </span>
                  </button>
                  <button 
                    onClick={() => navigate("/")} 
                    className="px-8 py-4 rounded-full text-base font-bold bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </InteractiveGamesLayout>
  );
}
