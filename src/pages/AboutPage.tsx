import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Heart, 
  Users, 
  Zap, 
  Globe, 
  TrendingUp,
  Award,
  BookOpen,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Rocket,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const values: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous nous engageons à offrir des formations de la plus haute qualité, constamment mises à jour avec les dernières technologies et méthodologies du secteur numérique.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Heart,
    title: "Accessibilité",
    description: "L'éducation numérique doit être accessible à tous, indépendamment des moyens financiers. C'est pourquoi nous proposons de nombreux cours gratuits et des tarifs abordables.",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Nous croyons en la force de la communauté. Notre plateforme favorise l'entraide, le partage de connaissances et la collaboration entre étudiants et instructeurs.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Nous intégrons les dernières avancées technologiques, notamment les chatbots intelligents, pour offrir une expérience d'apprentissage personnalisée et efficace.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100"
  },
  {
    icon: Globe,
    title: "Local & Global",
    description: "Nous combinons l'expertise locale avec les meilleures pratiques internationales, créant un contenu adapté au marché sénégalais et africain tout en restant compétitif mondialement.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: TrendingUp,
    title: "Croissance",
    description: "Nous accompagnons nos étudiants dans leur développement professionnel continu, de l'apprentissage des bases jusqu'à l'expertise avancée et l'insertion professionnelle.",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const stats: Array<{
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    number: "5000+",
    label: "Étudiants actifs",
    icon: Users
  },
  {
    number: "150+",
    label: "Cours disponibles",
    icon: BookOpen
  },
  {
    number: "80+",
    label: "Métiers du numérique",
    icon: Briefcase
  },
  {
    number: "50+",
    label: "Instructeurs qualifiés",
    icon: GraduationCap
  }
];

const milestones = [
  {
    year: "2025",
    title: "Lancement de Jangalma Code",
    description: "Création de la plateforme avec une vision claire : rendre l'éducation numérique accessible à tous les Sénégalais.",
    icon: Rocket
  },
  {
    year: "2025",
    title: "Premiers 1000 étudiants",
    description: "Atteinte de notre premier millier d'étudiants inscrits, confirmant le besoin et l'engouement pour notre approche.",
    icon: Users
  }
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 px-4 py-2 bg-white/20 text-white border-white/30">
                <MapPin className="h-4 w-4 mr-2" />
                100% Sénégalaise
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                À propos de Jangalma Code
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                La première plateforme d'apprentissage numérique 100% sénégalaise, 
                dédiée à la transformation digitale de l'Afrique
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  <Award className="h-5 w-5 inline mr-2" />
                  Formation certifiante
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  <Users className="h-5 w-5 inline mr-2" />
                  Communauté active
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                  <Zap className="h-5 w-5 inline mr-2" />
                  Innovation IA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" variant="secondary">
                  Notre Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transformer l'éducation numérique au Sénégal
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Notre mission est de démocratiser l'accès à une éducation numérique de qualité 
                  pour tous les Sénégalais et Africains. Nous croyons que chaque personne, 
                  indépendamment de son origine ou de ses moyens, mérite d'avoir accès aux compétences 
                  qui façonneront l'avenir.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Formations accessibles</h3>
                      <p className="text-muted-foreground text-sm">
                        Cours gratuits et tarifs abordables pour tous
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Contenu local adapté</h3>
                      <p className="text-muted-foreground text-sm">
                        Formations adaptées au marché sénégalais et africain
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Accompagnement personnalisé</h3>
                      <p className="text-muted-foreground text-sm">
                        Instructeurs qualifiés pour un suivi personnalisé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-primary/10 rounded-3xl p-8 border-2 border-primary/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Objectif 2025</h3>
                        <p className="text-sm text-muted-foreground">10 000 étudiants formés</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Expansion</h3>
                        <p className="text-sm text-muted-foreground">8 pays d'Afrique de l'Ouest</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Innovation</h3>
                        <p className="text-sm text-muted-foreground">Intégration de chatbot intelligent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-16 mb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Notre Impact en Chiffres
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Des résultats concrets qui témoignent de notre engagement
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                Notre Histoire
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comment tout a commencé
              </h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Jangalma Code est né d'un constat simple : le Sénégal et l'Afrique regorgent de talents, 
                mais l'accès aux formations de qualité dans les métiers du numérique reste limité. 
                Trop souvent, les cours disponibles sont soit inaccessibles financièrement, soit inadaptés 
                au contexte local et aux réalités du marché africain.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                En 2025, nous avons décidé de changer les choses. Nous avons créé une plateforme qui 
                combine l'excellence pédagogique des meilleures écoles internationales avec une 
                compréhension profonde des réalités et des besoins du marché sénégalais et africain. 
                Notre objectif : former la prochaine génération de talents numériques africains.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Aujourd'hui, Jangalma Code est devenue une référence pour des milliers d'étudiants 
                qui souhaitent se former aux métiers du numérique. Notre plateforme offre des cours 
                gratuits et premium, enseignés par des instructeurs locaux qualifiés pour un 
                accompagnement personnalisé.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Notre Parcours</h3>
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{milestone.year}</Badge>
                        <h4 className="text-xl font-semibold">{milestone.title}</h4>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Nos Valeurs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Les principes qui nous guident
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chaque décision que nous prenons est guidée par ces valeurs fondamentales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="relative z-10">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  Notre Vision
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  L'avenir que nous construisons
                </h2>
                <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                  Nous imaginons un Sénégal et une Afrique où chaque personne, quel que soit son 
                  parcours ou sa situation, peut accéder aux compétences numériques nécessaires 
                  pour réussir dans l'économie du 21ème siècle. Une Afrique où les talents locaux 
                  sont reconnus, valorisés et capables de rivaliser sur la scène internationale.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                    <Globe className="h-5 w-5 inline mr-2" />
                    Leader en Afrique de l'Ouest
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                    <Award className="h-5 w-5 inline mr-2" />
                    Excellence reconnue
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium">
                    <Rocket className="h-5 w-5 inline mr-2" />
                    Innovation continue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 border-2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rejoignez notre mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Que vous souhaitiez apprendre, enseigner ou contribuer à notre vision, 
              il y a une place pour vous dans la communauté Jangalma Code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-primary"
                onClick={() => navigate("/inscription")}
              >
                Commencer à apprendre
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
