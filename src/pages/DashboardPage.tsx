import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Award,
  Play,
  CheckCircle2,
  Calendar,
  Target,
  BarChart3,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Données de progression des cours
const enrolledCourses: Array<{
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  thumbnail: string;
  duration: string;
  level: string;
}> = [];

// Statistiques
const stats: Array<{
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [];

// Portfolio - Réalisations de l'étudiant
type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  technologies: string[];
  date: string;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    technologies: "",
    date: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
  });

  const totalProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length;

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioItem.title || !newPortfolioItem.description) {
      toast.error("Veuillez remplir au moins le titre et la description");
      return;
    }

    const technologiesArray = newPortfolioItem.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    const newItem: PortfolioItem = {
      id: portfolioItems.length + 1,
      title: newPortfolioItem.title,
      description: newPortfolioItem.description,
      imageUrl: newPortfolioItem.imageUrl || undefined,
      linkUrl: newPortfolioItem.linkUrl || undefined,
      technologies: technologiesArray,
      date: newPortfolioItem.date,
    };

    setPortfolioItems([...portfolioItems, newItem]);
    toast.success("Réalisation ajoutée avec succès !");
    setNewPortfolioItem({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      technologies: "",
      date: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    });
    setPortfolioDialogOpen(false);
  };

  const handleDeletePortfolioItem = (id: number) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
    toast.success("Réalisation supprimée");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Mon Tableau de Bord Étudiant</h1>
                <p className="text-muted-foreground">
                  Suivez votre progression et continuez votre apprentissage
                </p>
              </div>
            </div>
          </div>

          {/* Statistiques globales - Étudiant */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color.replace("text-", "bg-")}/10 rounded-full flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progression globale - Étudiant */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Ma Progression Globale d'Apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Votre progression moyenne sur tous vos cours</span>
                  <span className="text-3xl font-bold text-primary">{Math.round(totalProgress)}%</span>
                </div>
                <Progress value={totalProgress} className="h-4" />
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">
                      {enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0)} leçons complétées
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">45h d'étude</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Continuez vos cours pour améliorer votre progression et débloquer de nouvelles réalisations
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Mes Cours Suivis
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Mon Portfolio
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Mes Réalisations
              </TabsTrigger>
            </TabsList>

            {/* Onglet Mes Cours Suivis */}
            <TabsContent value="courses" className="space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Mes Cours en Cours</h2>
                <p className="text-muted-foreground">
                  Reprenez votre apprentissage là où vous vous êtes arrêté
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow border-2 border-primary/10">
                    <CardContent className="p-0">
                      <div className={`h-32 ${course.thumbnail} rounded-t-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-white opacity-20" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90">
                            {course.level}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            <div className="flex items-center justify-between text-white text-xs mb-1">
                              <span>Progression</span>
                              <span className="font-bold">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1.5">
                              <div
                                className="bg-white h-1.5 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">Par {course.instructor}</p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-primary"
                            onClick={() => navigate(`/cours/${course.id}`)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Continuer
                          </Button>
                        </div>

                        {/* Barre de progression */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progression</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {course.completedLessons} / {course.totalLessons} leçons complétées
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.lastAccessed}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {course.completedLessons} complétées
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Onglet Portfolio */}
            <TabsContent value="portfolio" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Mon Portfolio</h2>
                  <p className="text-muted-foreground">
                    Partagez vos réalisations et projets avec la communauté
                  </p>
                </div>
                <Dialog open={portfolioDialogOpen} onOpenChange={setPortfolioDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une réalisation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ajouter une réalisation</DialogTitle>
                      <DialogDescription>
                        Partagez un projet ou une réalisation que vous avez créé
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPortfolioItem} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Titre <span className="text-destructive">*</span>
                        </label>
                        <Input
                          value={newPortfolioItem.title}
                          onChange={(e) =>
                            setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })
                          }
                          placeholder="Ex: Site Web E-commerce"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Description <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          value={newPortfolioItem.description}
                          onChange={(e) =>
                            setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })
                          }
                          placeholder="Décrivez votre projet..."
                          rows={4}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            <ImageIcon className="h-4 w-4 inline mr-1" />
                            URL de l'image
                          </label>
                          <Input
                            value={newPortfolioItem.imageUrl}
                            onChange={(e) =>
                              setNewPortfolioItem({ ...newPortfolioItem, imageUrl: e.target.value })
                            }
                            placeholder="https://..."
                            type="url"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            <LinkIcon className="h-4 w-4 inline mr-1" />
                            Lien du projet
                          </label>
                          <Input
                            value={newPortfolioItem.linkUrl}
                            onChange={(e) =>
                              setNewPortfolioItem({ ...newPortfolioItem, linkUrl: e.target.value })
                            }
                            placeholder="https://..."
                            type="url"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Technologies utilisées
                        </label>
                        <Input
                          value={newPortfolioItem.technologies}
                          onChange={(e) =>
                            setNewPortfolioItem({ ...newPortfolioItem, technologies: e.target.value })
                          }
                          placeholder="React, Node.js, MongoDB (séparées par des virgules)"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Séparez les technologies par des virgules
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setPortfolioDialogOpen(false)}
                        >
                          Annuler
                        </Button>
                        <Button type="submit" className="bg-gradient-primary">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {portfolioItems.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Aucune réalisation</h3>
                    <p className="text-muted-foreground mb-4">
                      Commencez à partager vos projets et réalisations
                    </p>
                    <Button
                      onClick={() => setPortfolioDialogOpen(true)}
                      className="bg-gradient-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une réalisation
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        {item.imageUrl ? (
                          <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground opacity-50" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePortfolioItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                            {item.linkUrl && (
                              <a
                                href={item.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm flex items-center gap-1"
                              >
                                Voir le projet
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Onglet Réalisations */}
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-secondary" />
                    Vos Réalisations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Premier Cours</h3>
                      <p className="text-sm text-muted-foreground">Vous avez complété votre premier cours</p>
                      <Badge className="mt-2 bg-primary">Débloqué</Badge>
                    </div>

                    <div className="text-center p-6 bg-accent/5 rounded-lg border border-accent/20">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">50 Leçons</h3>
                      <p className="text-sm text-muted-foreground">Vous avez complété 50 leçons</p>
                      <Badge className="mt-2 bg-accent">Débloqué</Badge>
                    </div>

                    <div className="text-center p-6 bg-secondary/5 rounded-lg border border-secondary/20">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Expert</h3>
                      <p className="text-sm text-muted-foreground">Complétez 10 cours</p>
                      <Badge variant="outline" className="mt-2">En cours</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;

