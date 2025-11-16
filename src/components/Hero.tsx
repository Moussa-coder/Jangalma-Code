import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ overflow: 'hidden' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10" style={{ overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto text-center animate-fade-in" style={{ overflow: 'visible' }}>
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm leading-normal">🇸🇳 100% Sénégalaise</span>
          </div>
          
          <div className="mb-6 overflow-visible" style={{ paddingBottom: '1rem', paddingTop: '0.5rem' }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-hero" style={{ paddingBottom: '1rem', lineHeight: '1.4', display: 'inline-block' }}>
              Jangalma Code
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Apprenez les métiers du numérique avec les meilleurs instructeurs sénégalais. 
            Formations accessibles pour tous, quel que soit votre âge ou vos moyens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate("/inscription")}
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-2"
              onClick={() => navigate("/cours")}
            >
              Découvrir les cours
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">150+ Cours</h3>
              <p className="text-muted-foreground text-sm">
                Dans tous les domaines du numérique
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">5000+ Étudiants</h3>
              <p className="text-muted-foreground text-sm">
                Apprennent chaque jour
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Réalisations</h3>
              <p className="text-muted-foreground text-sm">
                Suivez votre progression et vos accomplissements
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
