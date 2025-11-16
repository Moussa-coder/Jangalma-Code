import { useState } from "react";
import { 
  Users, Search, Mail, MessageSquare, Eye, Calendar, BookOpen, 
  TrendingUp, Award, Clock, Filter, MoreVertical, Download, 
  UserCheck, UserX, BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Données d'exemple des étudiants
const students: Array<{
  id: number;
  name: string;
  email: string;
  coursesEnrolled: number;
  progress: number;
  lastActivity: string;
  status: string;
  avatar: string;
  joinDate: string;
  totalHours: number;
  certificates: number;
  averageScore: number;
  courses: string[];
}> = [];

const InstructorStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || student.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "courses":
          return b.coursesEnrolled - a.coursesEnrolled;
        case "activity":
          return a.lastActivity.localeCompare(b.lastActivity);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "actif").length;
  const totalCoursesEnrolled = students.reduce((acc, s) => acc + s.coursesEnrolled, 0);
  const averageProgress = Math.round(
    students.reduce((acc, s) => acc + s.progress, 0) / students.length
  );
  const totalCertificates = students.reduce((acc, s) => acc + s.certificates, 0);

  const handleViewStudent = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
  };

  const handleSendMessage = (studentId: number) => {
    toast.info(`Ouverture du chat avec l'étudiant #${studentId}`);
  };

  const handleExport = () => {
    toast.success("Export des données des étudiants en cours...");
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Étudiants</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Étudiants Actifs</p>
                <p className="text-2xl font-bold text-primary">{activeStudents}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((activeStudents / totalStudents) * 100)}% du total
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cours Suivis</p>
                <p className="text-2xl font-bold text-accent">{totalCoursesEnrolled}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Moyenne: {(totalCoursesEnrolled / totalStudents).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progression Moyenne</p>
                <p className="text-2xl font-bold text-secondary">{averageProgress}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +5% ce mois
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificats Délivrés</p>
                <p className="text-2xl font-bold">{totalCertificates}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <Award className="h-3 w-3 inline mr-1" />
                  Certifications
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Mes Étudiants</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Gérez et communiquez avec vos étudiants
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtres et recherche */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un étudiant par nom ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="progress">Progression</SelectItem>
                  <SelectItem value="courses">Nombre de cours</SelectItem>
                  <SelectItem value="activity">Dernière activité</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Liste des étudiants */}
          <div className="space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">Aucun étudiant trouvé</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gradient-primary text-white text-lg">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{student.name}</h3>
                            <Badge variant={student.status === "actif" ? "default" : "secondary"}>
                              {student.status}
                            </Badge>
                            {student.certificates > 0 && (
                              <Badge variant="outline" className="gap-1">
                                <Award className="h-3 w-3" />
                                {student.certificates} certificat{student.certificates > 1 ? "s" : ""}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <span>{student.coursesEnrolled} cours</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{student.totalHours}h d'étude</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{student.lastActivity}</span>
                            </div>
                          </div>
                          
                          {/* Progression */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progression globale</span>
                              <span className="font-semibold">{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-2" />
                          </div>

                          {/* Cours suivis */}
                          <div className="flex flex-wrap gap-2">
                            {student.courses.map((course, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(student.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendMessage(student.id)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Envoyer un message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Envoyer un email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de détails de l'étudiant */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profil de l'Étudiant</DialogTitle>
            <DialogDescription>
              Informations détaillées sur {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {selectedStudent.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                  <Badge variant={selectedStudent.status === "actif" ? "default" : "secondary"}>
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Cours Suivis</p>
                    <p className="text-2xl font-bold">{selectedStudent.coursesEnrolled}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Progression</p>
                    <p className="text-2xl font-bold">{selectedStudent.progress}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Heures d'Étude</p>
                    <p className="text-2xl font-bold">{selectedStudent.totalHours}h</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Note Moyenne</p>
                    <p className="text-2xl font-bold">{selectedStudent.averageScore}/100</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cours Suivis</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.courses.map((course, idx) => (
                    <Badge key={idx} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Fermer
                </Button>
                <Button onClick={() => handleSendMessage(selectedStudent.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer un message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorStudentsPage;
