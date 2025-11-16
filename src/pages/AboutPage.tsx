import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Users, Zap, Globe, TrendingUp } from "lucide-react";

const values: Array<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = [];

const stats: Array<{
  number: string;
  label: string;
}> = [];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-20 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                À propos de Jangalma Code
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                La première plateforme d'apprentissage numérique 100% sénégalaise
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Notre Histoire
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Jangalma Code est né d'un constat simple : le Sénégal et l'Afrique regorgent de talents, 
                mais l'accès aux formations de qualité dans les métiers du numérique reste limité. 
                Trop souvent, les cours disponibles sont soit inaccessibles financièrement, soit inadaptés 
                au contexte local.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                En 2024, nous avons décidé de changer les choses. Nous avons créé une plateforme qui 
                combine l'excellence pédagogique des meilleures écoles internationales avec une 
                compréhension profonde des réalités et des besoins du marché sénégalais et africain.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aujourd'hui, Jangalma Code est devenue une référence pour des milliers d'étudiants 
                qui souhaitent se former aux métiers du numérique. Notre plateforme offre des cours 
                gratuits et premium, enseignés par des instructeurs locaux qualifiés et bientôt assistés 
                par des agents IA pour un accompagnement personnalisé 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-16 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre mission et notre vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Notre Vision pour l'Avenir
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Nous imaginons un Sénégal et une Afrique où chaque personne, quel que soit son 
              parcours ou sa situation, peut accéder aux compétences numériques nécessaires 
              pour réussir dans l'économie du 21ème siècle.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
