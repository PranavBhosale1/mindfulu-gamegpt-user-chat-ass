import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Mic, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRecording } from "./RecordingContext";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState({
    camera: false,
    audio: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const { stopRecording } = useRecording();

  useEffect(() => {
    stopRecording();
  }, []);

  const requestPermissions = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach(track => track.stop());

      setPermissions({ camera: true, audio: true });
      toast({
        title: "Permissions Granted!",
        description: "Camera and microphone access granted successfully.",
      });
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Please allow camera and microphone access to continue.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (permissions.camera && permissions.audio && consentGiven) {
      onStart(); // Notify parent to show ChallengePage
    } else {
      toast({
        title: "Action Required",
        description: !consentGiven
          ? "Please check the consent box to proceed."
          : "Please grant camera and microphone permissions.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[80vh] p-4 relative" style={{backgroundColor: 'var(--bg-cream)'}}>
      <div className="relative z-10 max-w-[605px] mx-auto w-full">
        <Card className="p-6 bg-white backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl space-y-6 animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto gradient-purple rounded-2xl flex items-center justify-center animate-float">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-poppins" style={{color: 'var(--brand-purple)'}}>
              Challenge Experience
            </h1>
            <p className="text-lg font-caveat" style={{color: 'var(--brand-pink)', fontSize: '1.5rem'}}>
              Your Interactive Journey
            </p>
            <p className="text-base" style={{color: 'var(--text-medium)'}}>
              Welcome to MindfulU! Let's begin your interactive challenge journey with personalized wellness games.
            </p>
          </div>

          {/* Permission States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
              permissions.camera ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
            }`}>
              {permissions.camera ? (
                <CheckCircle className="w-6 h-6" style={{color: 'var(--brand-teal)'}} />
              ) : (
                <Camera className="w-6 h-6" style={{color: 'var(--text-medium)'}} />
              )}
              <span className={`font-medium ${permissions.camera ? 'text-green-700' : ''}`} style={!permissions.camera ? {color: 'var(--text-dark)'} : {}}>
                Camera Access
              </span>
            </div>

            <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
              permissions.audio ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
            }`}>
              {permissions.audio ? (
                <CheckCircle className="w-6 h-6" style={{color: 'var(--brand-teal)'}} />
              ) : (
                <Mic className="w-6 h-6" style={{color: 'var(--text-medium)'}} />
              )}
              <span className={`font-medium ${permissions.audio ? 'text-green-700' : ''}`} style={!permissions.audio ? {color: 'var(--text-dark)'} : {}}>
                Microphone Access
              </span>
            </div>
          </div>

          {/* Consent checkbox */}
          {(permissions?.camera || permissions?.audio) && (
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <input
                id="consent"
                type="checkbox"
                checked={consentGiven}
                onChange={() => setConsentGiven(!consentGiven)}
                className="mt-1 w-5 h-5 accent-purple-600"
              />
              <label htmlFor="consent" className="text-sm font-medium" style={{color: 'var(--text-dark)'}}>
                <span className="font-bold" style={{color: 'var(--brand-purple)'}}>Privacy First:</span> For better precision in assessment, your video and audio will be recorded during the challenge. Your data is completely private and secure.
              </label>
            </div>
          )}

          {/* CTA Button */}
          <div>
            {!permissions.camera || !permissions.audio ? (
              <Button 
                onClick={requestPermissions} 
                disabled={isLoading}
                className="w-full h-14 text-lg font-bold gradient-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="loading-spinner"></div>
                    Requesting Permissions...
                  </div>
                ) : (
                  "Let's Begin Your Journey"
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleStart}
                className="w-full h-14 text-lg font-bold gradient-teal hover:opacity-90 transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg animate-pulse-gentle"
              >
                🚀 Start Challenge Experience
              </Button>
            )}
          </div>

          <div className="text-center text-sm font-medium" style={{color: 'var(--text-medium)'}}>
            You'll complete challenges, share reactions, and track emotions in this immersive wellness experience.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
