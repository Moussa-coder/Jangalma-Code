import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Code, 
  Smartphone, 
  Brain, 
  Megaphone, 
  Users2, 
  Palette, 
  Network, 
  BarChart,
  CheckCircle,
  TrendingUp,
  Briefcase,
  ChevronRight
} from "lucide-react";

const domains: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  skills: string[];
  careers: string[];
  courses: number;
}> = [];

const DomainsPage = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<typeof domains[0] | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Explorez nos domaines de formation
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                8 domaines, 80+ métiers du numérique pour transformer votre carrière
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  150+ cours disponibles
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  Progression suivie
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  Instructeurs qualifiés
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domains Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${domain.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <domain.icon className={`h-8 w-8 ${domain.color}`} />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{domain.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{domain.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <TrendingUp className="h-4 w-4" />
                    <span>{domain.courses} cours</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {domain.description}
                  </p>
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedDomain(domain)}
                        >
                          <Briefcase className="h-4 w-4 mr-2" />
                          Voir les métiers ({domain.careers.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <domain.icon className={`h-6 w-6 ${domain.color}`} />
                            {domain.title}
                          </DialogTitle>
                          <DialogDescription>
                            {domain.subtitle} - {domain.careers.length} métiers disponibles
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground">{domain.description}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              Métiers dans ce domaine
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {domain.careers.map((career, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                >
                                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{career}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Compétences clés</h3>
                            <div className="flex flex-wrap gap-2">
                              {domain.skills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="pt-4 border-t">
                            <Button 
                              className="w-full bg-gradient-primary"
                              onClick={() => {
                                navigate(`/cours?domaine=${encodeURIComponent(domain.title)}`);
                                setSelectedDomain(null);
                              }}
                            >
                              Voir les cours ({domain.courses})
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      className="w-full bg-gradient-primary"
                      onClick={() => navigate(`/cours?domaine=${encodeURIComponent(domain.title)}`)}
                    >
                      Voir les cours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à démarrer votre formation ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 5000 étudiants qui ont déjà transformé leur carrière avec Jangalma Code
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg"
                onClick={() => navigate("/cours")}
              >
                Parcourir tous les cours
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg bg-white hover:bg-white/90"
                onClick={() => navigate("/inscription")}
              >
                S'inscrire gratuitement
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DomainsPage;
