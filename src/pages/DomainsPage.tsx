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
}> = [
  {
    icon: Code,
    title: "Développement Web",
    subtitle: "Frontend & Backend",
    description: "Maîtrisez les technologies modernes du web pour créer des sites et applications web performantes. De HTML/CSS à React, Node.js et les frameworks modernes.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "TypeScript", "Vue.js", "Angular", "PHP", "Python", "SQL"],
    careers: [
      "Développeur Frontend",
      "Développeur Backend",
      "Développeur Full Stack",
      "Développeur React",
      "Développeur Vue.js",
      "Développeur Angular",
      "Développeur Node.js",
      "Développeur PHP",
      "Développeur Python/Django",
      "Développeur WordPress"
    ],
    courses: 25
  },
  {
    icon: Smartphone,
    title: "Développement Mobile",
    subtitle: "iOS & Android",
    description: "Créez des applications mobiles natives et cross-platform pour iOS et Android. Maîtrisez React Native, Flutter, Swift, Kotlin et les meilleures pratiques.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Dart", "iOS Development", "Android Development", "Firebase", "App Store", "Google Play"],
    careers: [
      "Développeur iOS",
      "Développeur Android",
      "Développeur React Native",
      "Développeur Flutter",
      "Développeur Mobile Cross-Platform",
      "Architecte Mobile",
      "Ingénieur Mobile Senior",
      "Développeur Swift",
      "Développeur Kotlin",
      "Spécialiste Mobile UI/UX"
    ],
    courses: 18
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    subtitle: "Machine Learning & IA",
    description: "Explorez l'intelligence artificielle, le machine learning et le deep learning. Créez des modèles prédictifs, des chatbots intelligents et des solutions IA innovantes.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Science", "Neural Networks", "Scikit-learn"],
    careers: [
      "Data Scientist",
      "Machine Learning Engineer",
      "Ingénieur IA",
      "Spécialiste NLP",
      "Spécialiste Computer Vision",
      "Chercheur en IA",
      "Développeur de Chatbots",
      "Analyste IA",
      "Architecte IA",
      "Consultant en IA"
    ],
    courses: 15
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    subtitle: "SEO, Social Media & Publicité",
    description: "Apprenez le marketing digital, le SEO, le marketing sur les réseaux sociaux, la publicité en ligne, l'email marketing et l'analyse de données marketing.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Email Marketing", "Analytics", "Social Media", "Inbound Marketing", "Growth Hacking", "E-commerce"],
    careers: [
      "Responsable Marketing Digital",
      "Spécialiste SEO",
      "Gestionnaire de Campagnes Publicitaires",
      "Community Manager",
      "Content Manager",
      "Growth Hacker",
      "Analyste Marketing",
      "Spécialiste Email Marketing",
      "Influenceur Digital",
      "Consultant en Marketing Digital"
    ],
    courses: 20
  },
  {
    icon: Users2,
    title: "Gestion de Projet",
    subtitle: "Agile, Scrum & Management",
    description: "Devenez chef de projet agile, Scrum Master ou Product Owner. Maîtrisez les méthodologies agiles, la gestion d'équipe et la livraison de projets numériques.",
    color: "text-red-600",
    bgColor: "bg-red-100",
    skills: ["Scrum", "Agile", "Kanban", "Jira", "Project Management", "Product Management", "Team Leadership", "Stakeholder Management", "Risk Management", "Budget Management"],
    careers: [
      "Chef de Projet Digital",
      "Scrum Master",
      "Product Owner",
      "Product Manager",
      "Project Manager",
      "Agile Coach",
      "Responsable de Programme",
      "Chef de Projet IT",
      "Delivery Manager",
      "Portfolio Manager"
    ],
    courses: 12
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    subtitle: "Interface & Expérience Utilisateur",
    description: "Créez des interfaces utilisateur attrayantes et des expériences utilisateur exceptionnelles. Maîtrisez Figma, Adobe XD, le design thinking et les principes UX.",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    skills: ["Figma", "Adobe XD", "Sketch", "UI Design", "UX Design", "Prototyping", "User Research", "Wireframing", "Design Systems", "Accessibility"],
    careers: [
      "Designer UI",
      "Designer UX",
      "UI/UX Designer",
      "Product Designer",
      "Designer d'Interface",
      "UX Researcher",
      "Designer d'Expérience",
      "Motion Designer",
      "Designer de Produit",
      "Designer de Services"
    ],
    courses: 16
  },
  {
    icon: Network,
    title: "Cybersécurité",
    subtitle: "Sécurité Informatique & Réseaux",
    description: "Protégez les systèmes et les données contre les cybermenaces. Maîtrisez la sécurité réseau, l'éthique hacking, la gestion des vulnérabilités et la conformité.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    skills: ["Ethical Hacking", "Network Security", "Penetration Testing", "Security Auditing", "Cryptography", "Incident Response", "Risk Assessment", "Compliance", "Firewall", "SIEM"],
    careers: [
      "Analyste en Cybersécurité",
      "Pentester",
      "Ingénieur Sécurité",
      "Architecte Sécurité",
      "Consultant en Sécurité",
      "Responsable Sécurité",
      "Spécialiste SOC",
      "Auditeur Sécurité",
      "Expert en Forensique",
      "Chasseur de Menaces"
    ],
    courses: 14
  },
  {
    icon: BarChart,
    title: "Data Science",
    subtitle: "Analyse & Visualisation de Données",
    description: "Analysez et visualisez les données pour prendre des décisions stratégiques éclairées. Maîtrisez Python, R, SQL, les outils de BI et le machine learning.",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Data Analysis", "Data Visualization", "Statistics", "Big Data", "ETL"],
    careers: [
      "Data Analyst",
      "Business Analyst",
      "Data Engineer",
      "BI Analyst",
      "Statisticien",
      "Data Engineer",
      "Analyste Financier",
      "Data Consultant",
      "Spécialiste Big Data",
      "Analyste de Performance"
    ],
    courses: 17
  }
];

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
