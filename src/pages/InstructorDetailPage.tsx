import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Award,
  BookOpen,
  Star,
  Users,
  Linkedin,
  Github,
  Twitter,
  Mail,
  Globe,
  Calendar,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  MessageSquare,
  Heart,
  Share2,
  Filter,
  Play,
  Clock,
  Eye,
  Copy,
  Facebook,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Données enrichies des instructeurs
const instructors: Array<{
  id: number;
  name: string;
  title: string;
  domain: string;
  location: string;
  email: string;
  website?: string;
  bio: string;
  fullBio: string;
  avatar: string;
  initials: string;
  rating: number;
  students: number;
  coursesCount: number;
  totalViews: number;
  subscribers: number;
  joinDate: string;
  expertise: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    period: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
  }>;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  courses: Array<{
    id: number;
    title: string;
    students: number;
    rating: number;
    views: number;
  }>;
  testimonials: Array<{
    author: string;
    role: string;
    content: string;
    rating: number;
  }>;
  certifications?: Array<unknown>;
}> = [];

const InstructorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const instructor = instructors.find((i) => i.id === parseInt(id || "0"));
  const [courseFilter, setCourseFilter] = useState("all");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  if (!instructor) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex-1 pt-4 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Instructeur non trouvé</h1>
            <Button onClick={() => navigate("/instructeurs")}>Retour aux instructeurs</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const title = `${instructor?.name} - ${instructor?.title}`;
    const text = `Découvrez le profil de ${instructor?.name} sur Jangalma Code`;

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers !");
      return;
    }

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        "_blank"
      );
      return;
    }

    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
      return;
    }

    // Partage natif si disponible
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers !");
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    // Simulation d'envoi
    const mailtoLink = `mailto:${instructor?.email}?subject=${encodeURIComponent(contactForm.subject || `Contact depuis Jangalma Code - ${contactForm.name}`)}&body=${encodeURIComponent(`Bonjour ${instructor?.name},\n\n${contactForm.message}\n\nCordialement,\n${contactForm.name}\n${contactForm.email}`)}`;
    window.location.href = mailtoLink;
    
    toast.success("Redirection vers votre client email...");
    setContactDialogOpen(false);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const filteredCourses = instructor.courses.filter((course) => {
    if (courseFilter === "all") return true;
    if (courseFilter === "popular") return course.rating >= 4.8;
    if (courseFilter === "recent") return true;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/instructeurs")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux instructeurs
          </Button>

          {/* Bannière de profil */}
          <div className={`h-48 ${instructor.avatar} rounded-t-2xl mb-0 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>

          {/* En-tête du profil */}
          <Card className="rounded-t-none border-t-0">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 -mt-20 md:-mt-24">
                  <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-lg">
                    <AvatarFallback className={`${instructor.avatar} text-white text-4xl md:text-5xl font-bold`}>
                      {instructor.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold">{instructor.name}</h1>
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-xl text-muted-foreground mb-3">{instructor.title}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{instructor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Membre depuis {instructor.joinDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{formatNumber(instructor.subscribers)} abonnés</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        {instructor.domain}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant={isSubscribed ? "secondary" : "default"}
                        onClick={() => setIsSubscribed(!isSubscribed)}
                        className={isSubscribed ? "" : "bg-gradient-primary"}
                      >
                        {isSubscribed ? "Abonné" : "S'abonner"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                        <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        {isFavorite ? "Retiré" : "Favoris"}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Share2 className="h-4 w-4 mr-2" />
                            Partager
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleShare("copy")}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copier le lien
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleShare("facebook")}>
                            <Facebook className="h-4 w-4 mr-2" />
                            Partager sur Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare("twitter")}>
                            <Twitter className="h-4 w-4 mr-2" />
                            Partager sur Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                            <Linkedin className="h-4 w-4 mr-2" />
                            Partager sur LinkedIn
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleShare()}>
                            <Link2 className="h-4 w-4 mr-2" />
                            Partager via...
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Contacter
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contacter {instructor.name}</DialogTitle>
                            <DialogDescription>
                              Envoyez un message à {instructor.name}. Votre message sera envoyé par email.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Votre nom <span className="text-destructive">*</span>
                              </label>
                              <Input
                                value={contactForm.name}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, name: e.target.value })
                                }
                                placeholder="Votre nom"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Votre email <span className="text-destructive">*</span>
                              </label>
                              <Input
                                type="email"
                                value={contactForm.email}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, email: e.target.value })
                                }
                                placeholder="votre@email.com"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Sujet</label>
                              <Input
                                value={contactForm.subject}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, subject: e.target.value })
                                }
                                placeholder="Sujet du message"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Message <span className="text-destructive">*</span>
                              </label>
                              <Textarea
                                value={contactForm.message}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, message: e.target.value })
                                }
                                placeholder="Votre message..."
                                rows={5}
                                required
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setContactDialogOpen(false)}
                              >
                                Annuler
                              </Button>
                              <Button type="submit" className="bg-gradient-primary">
                                <Mail className="h-4 w-4 mr-2" />
                                Envoyer
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="flex items-center gap-4 mb-4">
                    {instructor.social.linkedin && (
                      <a
                        href={instructor.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Profil LinkedIn de l'instructeur"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                    )}
                    {instructor.social.github && (
                      <a
                        href={instructor.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Profil GitHub de l'instructeur"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Github className="h-5 w-5 text-primary" />
                      </a>
                    )}
                    {instructor.social.twitter && (
                      <a
                        href={instructor.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Profil Twitter de l'instructeur"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Twitter className="h-5 w-5 text-primary" />
                      </a>
                    )}
                    {instructor.website && (
                      <a
                        href={instructor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Site web de l'instructeur"
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Globe className="h-5 w-5 text-primary" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistiques principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y my-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Star className="h-5 w-5 fill-primary" />
                    <span className="text-2xl font-bold">{instructor.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-5 w-5" />
                    <span className="text-2xl font-bold">{formatNumber(instructor.students)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Étudiants</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-2xl font-bold">{instructor.courses.length}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Cours</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Eye className="h-5 w-5" />
                    <span className="text-2xl font-bold">{formatNumber(instructor.totalViews)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Vues totales</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenu avec onglets */}
          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="courses">Cours ({instructor.courses.length})</TabsTrigger>
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Biographie</h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {instructor.fullBio || instructor.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Expertise</h2>
                      <div className="flex flex-wrap gap-2">
                        {instructor.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {instructor.achievements.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Réalisations</h2>
                        <div className="space-y-4">
                          {instructor.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold">{achievement.title}</h3>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Contact</h3>
                      <div className="space-y-3 text-sm">
                        {instructor.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={`mailto:${instructor.email}`}
                              className="text-primary hover:underline"
                            >
                              {instructor.email}
                            </a>
                          </div>
                        )}
                        {instructor.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={instructor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Site web
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{instructor.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Tous les cours ({instructor.courses.length})
                </h2>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="popular">Populaires</SelectItem>
                    <SelectItem value="recent">Récents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/cours/${course.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className={`h-40 ${instructor.avatar} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
                        <span className="text-white text-5xl font-bold opacity-20">
                          {course.title.charAt(0)}
                        </span>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.views} vues
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} étudiants</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-primary" size="sm">
                          Voir le cours
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {instructor.experience.length > 0 ? (
                  <>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <h2 className="text-2xl font-semibold">Expérience professionnelle</h2>
                        </div>
                        <div className="space-y-6">
                          {instructor.experience.map((exp, idx) => (
                            <div key={idx} className="border-l-2 border-primary pl-4 relative">
                              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                              <h3 className="font-semibold text-lg mb-1">{exp.title}</h3>
                              <p className="text-primary font-medium mb-1">{exp.company}</p>
                              <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                              <p className="text-sm text-muted-foreground">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <h2 className="text-2xl font-semibold">Formation</h2>
                        </div>
                        <div className="space-y-6">
                          {instructor.education.map((edu, idx) => (
                            <div key={idx} className="border-l-2 border-primary pl-4 relative">
                              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                              <h3 className="font-semibold text-lg mb-1">{edu.degree}</h3>
                              <p className="text-primary font-medium mb-1">{edu.school}</p>
                              <p className="text-sm text-muted-foreground">{edu.period}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Informations d'expérience à venir</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6">
              {instructor.testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {instructor.testimonials.map((testimonial, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {testimonial.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun témoignage pour le moment</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorDetailPage;
