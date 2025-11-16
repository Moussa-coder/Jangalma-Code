import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-12 border-2 border-primary/20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Prêt à commencer ?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transformez votre carrière dès aujourd'hui
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de Sénégalais qui développent leurs compétences numériques 
            avec Jangalma Code. L'inscription est gratuite !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate("/inscription")}
            >
              S'inscrire maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-2"
              onClick={() => navigate("/inscription-instructeur")}
            >
              Devenir instructeur
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            ✨ Aucune carte bancaire requise • Accès immédiat aux cours gratuits
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
