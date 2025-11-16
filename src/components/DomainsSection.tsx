import { Code, Smartphone, Brain, Megaphone, Users2, Palette, Network, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const domains: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = [];

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
