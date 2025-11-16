import { useState } from "react";
import { Search, Filter, MapPin, Award, BookOpen, Star, Users, LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const domains: string[] = [];

const instructors: Array<{
  id: number;
  name: string;
  title: string;
  domain: string;
  location: string;
  bio: string;
  avatar: string;
  initials: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}> = [];

const InstructorsPage = () => {
  const [selectedDomain, setSelectedDomain] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesDomain =
      selectedDomain === "Tous" || instructor.domain === selectedDomain;
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Nos instructeurs experts
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Apprenez auprès de professionnels qualifiés et passionnés par l'enseignement
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un instructeur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4">
            <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            {domains.map((domain) => (
              <Button
                key={domain}
                variant={selectedDomain === domain ? "default" : "outline"}
                onClick={() => setSelectedDomain(domain)}
                className="whitespace-nowrap"
              >
                {domain}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Instructeurs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Ans d'expérience moyenne</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Étudiants formés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                <div className="text-sm text-muted-foreground">Note moyenne</div>
              </CardContent>
            </Card>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredInstructors.length} instructeur{filteredInstructors.length > 1 ? "s" : ""} trouvé{filteredInstructors.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Instructors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <Card key={instructor.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className={`${instructor.avatar} text-white text-2xl font-bold`}>
                        {instructor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                        {instructor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {instructor.title}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{instructor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Domain Badge */}
                  <Badge variant="secondary" className="mb-4">
                    {instructor.domain}
                  </Badge>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary mb-1">
                        <Star className="h-4 w-4 fill-primary" />
                        <span className="font-semibold">{instructor.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Note</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="font-semibold">{instructor.students}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Étudiants</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-semibold">{instructor.courses}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Cours</div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{instructor.expertise.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 mb-4">
                    {instructor.social.linkedin && (
                      <a 
                        href={instructor.social.linkedin !== "#" ? instructor.social.linkedin : `https://linkedin.com/in/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                    )}
                    {instructor.social.github && (
                      <a 
                        href={instructor.social.github !== "#" ? instructor.social.github : `https://github.com/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <GithubIcon className="h-5 w-5" />
                      </a>
                    )}
                    {instructor.social.twitter && (
                      <a 
                        href={instructor.social.twitter !== "#" ? instructor.social.twitter : `https://twitter.com/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <TwitterIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-primary"
                    onClick={() => navigate(`/instructeurs/${instructor.id}`)}
                  >
                    Voir le profil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInstructors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                Aucun instructeur trouvé pour cette recherche
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedDomain("Tous"); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center">
            <Award className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous souhaitez devenir instructeur ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Partagez votre expertise avec des milliers d'étudiants et contribuez à la transformation numérique de l'Afrique
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg"
              onClick={() => navigate("/inscription-instructeur")}
            >
              Postuler comme instructeur
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorsPage;
