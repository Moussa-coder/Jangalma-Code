import { UserPlus, BookOpen, Trophy, Users } from "lucide-react";

const steps: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  forRole: string;
}> = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement en quelques secondes. Aucune carte bancaire requise. Accédez immédiatement à tous nos cours gratuits et commencez votre parcours d'apprentissage.",
    forRole: "Étudiant"
  },
  {
    icon: BookOpen,
    title: "Choisissez votre formation",
    description: "Parcourez notre catalogue de 150+ cours dans 8 domaines différents. Sélectionnez le domaine qui correspond à vos objectifs de carrière et commencez à apprendre à votre rythme.",
    forRole: "Étudiant"
  },
  {
    icon: Trophy,
    title: "Obtenez votre certification",
    description: "Suivez les cours, complétez les projets pratiques et passez les évaluations. Obtenez des certificats reconnus qui valoriseront votre CV et votre profil professionnel.",
    forRole: "Étudiant"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Commencez votre parcours d'apprentissage en 3 étapes simples
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative p-8 bg-card rounded-2xl border-2 border-primary/30 hover:border-primary transition-colors shadow-lg"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {index + 1}
                </div>
                
                <div className="mb-4 pt-2">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {step.forRole}
                  </span>
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
