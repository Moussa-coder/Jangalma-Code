import { useState, useEffect } from "react";
import { Search, Filter, Clock, Users, Star, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const domains: string[] = [];

const courses: Array<{
  id: number;
  title: string;
  description: string;
  domain: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  level: string;
  image: string;
}> = [];

const levels: string[] = [];
const prices: string[] = [];

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Liste unique des instructeurs
  const instructors = Array.from(
    new Set(courses.map((course) => course.instructor))
  ).sort();

  const [selectedDomain, setSelectedDomain] = useState(
    searchParams.get("domaine") || "Tous"
  );
  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("niveau") || "Tous"
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("prix") || "Tous"
  );
  const [selectedInstructor, setSelectedInstructor] = useState(
    searchParams.get("instructeur") || "Tous"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("recherche") || ""
  );

  // Mise à jour des paramètres d'URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDomain !== "Tous") params.set("domaine", selectedDomain);
    if (selectedLevel !== "Tous") params.set("niveau", selectedLevel);
    if (selectedPrice !== "Tous") params.set("prix", selectedPrice);
    if (selectedInstructor !== "Tous") params.set("instructeur", selectedInstructor);
    if (searchQuery) params.set("recherche", searchQuery);
    
    setSearchParams(params, { replace: true });
  }, [selectedDomain, selectedLevel, selectedPrice, selectedInstructor, searchQuery, setSearchParams]);

  const filteredCourses = courses.filter((course) => {
    const matchesDomain =
      selectedDomain === "Tous" || course.domain === selectedDomain;
    const matchesLevel =
      selectedLevel === "Tous" || course.level === selectedLevel;
    const matchesPrice =
      selectedPrice === "Tous" || course.price === selectedPrice;
    const matchesInstructor =
      selectedInstructor === "Tous" || course.instructor === selectedInstructor;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return (
      matchesDomain &&
      matchesLevel &&
      matchesPrice &&
      matchesInstructor &&
      matchesSearch
    );
  });

  const resetFilters = () => {
    setSelectedDomain("Tous");
    setSelectedLevel("Tous");
    setSelectedPrice("Tous");
    setSelectedInstructor("Tous");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedDomain !== "Tous" ||
    selectedLevel !== "Tous" ||
    selectedPrice !== "Tous" ||
    selectedInstructor !== "Tous" ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Explorez nos cours
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {courses.length} cours disponibles pour développer vos compétences dans le numérique
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un cours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Advanced Filters */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Filtres</h2>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Domain Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Domaine</label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Niveau</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Prix</label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {prices.map((price) => (
                      <SelectItem key={price} value={price}>
                        {price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Instructor Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Instructeur</label>
                <Select
                  value={selectedInstructor}
                  onValueChange={setSelectedInstructor}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tous">Tous</SelectItem>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor} value={instructor}>
                        {instructor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Domain Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Domaines rapides:</span>
              {domains
                .filter((d) => d !== "Tous")
                .map((domain) => (
                  <Button
                    key={domain}
                    variant={
                      selectedDomain === domain ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedDomain(domain)}
                    className="whitespace-nowrap"
                  >
                    {domain}
                  </Button>
                ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filteredCourses.length}
              </span>{" "}
              cours trouvé{filteredCourses.length > 1 ? "s" : ""} sur{" "}
              {courses.length}
            </p>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-1" />
                Effacer les filtres
              </Button>
            )}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader className="p-0">
                  <div className={`h-48 ${course.image} rounded-t-lg flex items-center justify-center`}>
                    <span className="text-white text-6xl font-bold opacity-20">
                      {course.title.charAt(0)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant={course.price === "Gratuit" ? "default" : "outline"}>
                      {course.price}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-sm font-medium mb-4">Par {course.instructor}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-gradient-primary"
                    onClick={() => navigate(`/cours/${course.id}`)}
                  >
                    Voir le cours
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                Aucun cours trouvé pour cette recherche
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedDomain("Tous"); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
