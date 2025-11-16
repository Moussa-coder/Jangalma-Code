import { Code, Smartphone, Brain, Megaphone, Users2, Palette, Network, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const domains: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = [
  {
    icon: Code,
    title: "Développement Web",
    description: "Maîtrisez les technologies modernes du web : HTML, CSS, JavaScript, React, Node.js et plus encore.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Smartphone,
    title: "Développement Mobile",
    description: "Créez des applications iOS et Android avec React Native, Flutter et les technologies natives.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    description: "Explorez le machine learning, le deep learning et l'IA pour créer des solutions innovantes.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Apprenez le SEO, le marketing sur les réseaux sociaux, la publicité en ligne et l'analyse de données.",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    icon: Users2,
    title: "Gestion de Projet",
    description: "Devenez chef de projet agile, Scrum Master ou Product Owner dans le secteur numérique.",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description: "Créez des interfaces utilisateur attrayantes et des expériences utilisateur exceptionnelles.",
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  },
  {
    icon: Network,
    title: "Cybersécurité",
    description: "Protégez les systèmes et les données contre les cybermenaces avec des compétences en sécurité.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  },
  {
    icon: BarChart,
    title: "Data Science",
    description: "Analysez et visualisez les données pour prendre des décisions stratégiques éclairées.",
    color: "text-teal-600",
    bgColor: "bg-teal-100"
  }
];

const DomainsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explorez nos domaines de formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des formations complètes dans 80+ métiers du numérique, adaptées au marché sénégalais et africain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2"
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${domain.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <domain.icon className={`h-8 w-8 ${domain.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{domain.title}</h3>
                <p className="text-muted-foreground text-sm">{domain.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
