import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Clock,
  Star,
  BarChart3,
  Award,
  MessageSquare,
  Settings,
  FileText,
  PieChart as PieChartIcon,
  Calendar,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données des cours de l'instructeur
const myCourses: Array<{
  id: number;
  title: string;
  students: number;
  rating: number;
  revenue: number;
  status: string;
  views: number;
  createdAt: string;
}> = [];

// Statistiques
const stats: Array<{
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [];

const InstructorDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultTab, setDefaultTab] = useState<"analytics">("analytics");
  const [periodFilter, setPeriodFilter] = useState<"week" | "month" | "year">("month");

  useEffect(() => {
    if (location.state?.tab) {
      setDefaultTab(location.state.tab as "analytics");
    }
  }, [location.state]);

  // Fonction pour convertir la date string en Date
  const parseDate = (dateString: string): Date => {
    // Format: "15 Jan 2024" ou "20 Fév 2024"
    const months: { [key: string]: number } = {
      "Jan": 0, "Fév": 1, "Mar": 2, "Avr": 3, "Mai": 4, "Juin": 5,
      "Juil": 6, "Aoû": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Déc": 11
    };
    
    const parts = dateString.split(" ");
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = months[parts[1]] ?? 0;
      const year = parseInt(parts[2]);
      return new Date(year, month, day);
    }
    return new Date(dateString);
  };

  // Fonction pour filtrer les données selon la période
  const getFilteredData = () => {
    const now = new Date();
    let startDate: Date;

    switch (periodFilter) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Filtrer les cours créés dans la période
    const filteredCourses = myCourses.filter((course) => {
      const courseDate = parseDate(course.createdAt);
      return courseDate >= startDate;
    });

    return filteredCourses;
  };

  const filteredCourses = getFilteredData();
  const totalRevenue = filteredCourses.reduce((acc, course) => acc + course.revenue, 0);
  const totalStudents = filteredCourses.reduce((acc, course) => acc + course.students, 0);
  const averageRating =
    filteredCourses.length > 0
      ? filteredCourses.reduce((acc, course) => acc + course.rating, 0) / filteredCourses.length
      : 0;


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Vue Globale de la Plateforme</h1>
                <p className="text-muted-foreground">
                  Aperçu général de vos activités et performances sur la plateforme
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as "week" | "month" | "year")}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vue Globale de la Plateforme */}
          <div className="mb-8 space-y-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Cours</p>
                      <p className="text-3xl font-bold text-primary">{filteredCourses.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {filteredCourses.filter(c => c.status === "publié").length} publiés
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Étudiants</p>
                      <p className="text-3xl font-bold text-accent">{totalStudents}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        Actifs ce mois
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Revenus Totaux</p>
                      <p className="text-3xl font-bold text-secondary">{totalRevenue.toLocaleString()} FCFA</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        Ce mois
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Note Moyenne</p>
                      <p className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}/5</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Star className="h-3 w-3 inline mr-1 fill-primary text-primary" />
                        Tous cours confondus
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary fill-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activités récentes et aperçu rapide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cours récents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Cours Récents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{course.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.students} étudiants • {course.views} vues
                            </p>
                          </div>
                        </div>
                        <Badge variant={course.status === "publié" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Aperçu des performances */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Aperçu des Performances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Vues totales</span>
                      </div>
                      <span className="font-bold">
                        {filteredCourses.reduce((acc, c) => acc + c.views, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Taux d'inscription</span>
                      </div>
                      <span className="font-bold">
                        {((totalStudents / (filteredCourses.reduce((acc, c) => acc + c.views, 0) || 1)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground fill-muted-foreground" />
                        <span className="text-sm font-medium">Cours les mieux notés</span>
                      </div>
                      <span className="font-bold">
                        {filteredCourses.filter(c => c.rating >= 4.5).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Revenu moyen par cours</span>
                      </div>
                      <span className="font-bold">
                        {filteredCourses.length > 0 ? Math.round(totalRevenue / filteredCourses.length).toLocaleString() : 0} FCFA
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={defaultTab} onValueChange={(value) => setDefaultTab(value as typeof defaultTab)} className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytiques & Performance
              </TabsTrigger>
            </TabsList>

            {/* Onglet Analytiques & Performance */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Analytiques & Performance</h2>
                <p className="text-muted-foreground">
                  Analysez les performances de vos cours et suivez votre croissance
                </p>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graphique des revenus par cours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Revenus par Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        revenue: {
                          label: "Revenus (FCFA)",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <BarChart data={filteredCourses.map(course => ({
                        name: course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title,
                        revenue: course.revenue,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Graphique des étudiants par cours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      Étudiants par Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        students: {
                          label: "Étudiants",
                          color: "hsl(var(--accent))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <BarChart data={filteredCourses.map(course => ({
                        name: course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title,
                        students: course.students,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="students" fill="var(--color-students)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Graphique d'évolution des revenus */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      Évolution des Revenus (6 derniers mois)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        revenue: {
                          label: "Revenus (FCFA)",
                          color: "hsl(var(--secondary))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <AreaChart data={[]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.3} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Graphique en camembert - Répartition des étudiants */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-primary" />
                      Répartition des Étudiants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={filteredCourses.reduce((acc, course, index) => {
                        const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "#8884d8", "#82ca9d"];
                        acc[`course${course.id}`] = {
                          label: course.title,
                          color: colors[index % colors.length],
                        };
                        return acc;
                      }, {} as Record<string, { label: string; color: string }>)}
                      className="h-[300px]"
                    >
                      <PieChart>
                        <Pie
                          data={filteredCourses.map(course => ({
                            name: course.title.length > 20 ? course.title.substring(0, 20) + "..." : course.title,
                            value: course.students,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {filteredCourses.map((entry, index) => {
                            const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"];
                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Graphique des notes par cours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-accent" />
                      Notes par Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        rating: {
                          label: "Note /5",
                          color: "hsl(var(--accent))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <LineChart data={filteredCourses.map(course => ({
                        name: course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title,
                        rating: course.rating,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 5]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="rating" stroke="var(--color-rating)" strokeWidth={3} dot={{ r: 6 }} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Graphique des vues par cours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Vues par Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        views: {
                          label: "Vues",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <AreaChart data={filteredCourses.map(course => ({
                        name: course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title,
                        views: course.views,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="views" stroke="var(--color-views)" fill="var(--color-views)" fillOpacity={0.3} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorDashboardPage;

