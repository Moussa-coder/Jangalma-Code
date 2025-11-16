import { useState, useEffect } from "react";
import { 
  Radio, Video, Calendar, Clock, Users, Plus, Play, StopCircle, 
  Edit, Trash2, Copy, TrendingUp, Eye, Bell, Share2, MoreVertical,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Données d'exemple pour les sessions live
const liveSessions: Array<{
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  students: number;
  status: string;
  link: string;
  recording: boolean;
  maxStudents: number;
}> = [];

const InstructorLivePage = () => {
  const [isLive, setIsLive] = useState(false);
  const [liveDuration, setLiveDuration] = useState(0);
  const [liveViewers, setLiveViewers] = useState(0);
  const [newSessionDialogOpen, setNewSessionDialogOpen] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: "",
    maxStudents: "",
  });

  // Simulation du temps de live
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLiveDuration((prev) => prev + 1);
        setLiveViewers(Math.floor(Math.random() * 20) + 10);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const handleStartLive = () => {
    setIsLive(true);
    setLiveDuration(0);
    setLiveViewers(12);
    toast.success("Session live démarrée !");
  };

  const handleStopLive = () => {
    setIsLive(false);
    setLiveDuration(0);
    setLiveViewers(0);
    toast.success("Session live terminée");
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionData.title || !sessionData.scheduledDate || !sessionData.scheduledTime) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Session live planifiée avec succès !");
    setNewSessionDialogOpen(false);
    setSessionData({
      title: "",
      description: "",
      scheduledDate: "",
      scheduledTime: "",
      duration: "",
      maxStudents: "",
    });
  };

  const handleStartSession = (sessionId: number) => {
    toast.info(`Démarrage de la session #${sessionId}`);
    setIsLive(true);
  };

  const handleEditSession = (sessionId: number) => {
    toast.info(`Modification de la session #${sessionId}`);
  };

  const handleDeleteSession = (sessionId: number) => {
    toast.error(`Suppression de la session #${sessionId}`);
  };

  const handleShareSession = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Lien copié dans le presse-papiers !");
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planifié":
        return <Badge variant="default">Planifié</Badge>;
      case "en_cours":
        return <Badge variant="default" className="bg-green-500">En cours</Badge>;
      case "terminé":
        return <Badge variant="secondary">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const upcomingSessions = liveSessions.filter((s) => s.status === "planifié");
  const activeSessions = liveSessions.filter((s) => s.status === "en_cours");
  const pastSessions = liveSessions.filter((s) => s.status === "terminé");

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Planifiées</p>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Actives</p>
                <p className="text-2xl font-bold text-green-500">{activeSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Radio className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Étudiants</p>
                <p className="text-2xl font-bold">
                  {liveSessions.reduce((acc, s) => acc + s.students, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Terminées</p>
                <p className="text-2xl font-bold">{pastSessions.length}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-secondary" />
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
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Cours en Live</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Donnez des cours en direct à vos étudiants
                </p>
              </div>
            </div>
            <Dialog open={newSessionDialogOpen} onOpenChange={setNewSessionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier une Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Planifier une Session Live</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle session de cours en direct
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSession} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="live-title">
                      Titre <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="live-title"
                      value={sessionData.title}
                      onChange={(e) =>
                        setSessionData({ ...sessionData, title: e.target.value })
                      }
                      placeholder="Ex: Introduction à React"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="live-description">Description</Label>
                    <Textarea
                      id="live-description"
                      value={sessionData.description}
                      onChange={(e) =>
                        setSessionData({ ...sessionData, description: e.target.value })
                      }
                      placeholder="Description de la session..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="live-date">
                        Date <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="live-date"
                        type="date"
                        value={sessionData.scheduledDate}
                        onChange={(e) =>
                          setSessionData({ ...sessionData, scheduledDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-time">
                        Heure <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="live-time"
                        type="time"
                        value={sessionData.scheduledTime}
                        onChange={(e) =>
                          setSessionData({ ...sessionData, scheduledTime: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="live-duration">Durée (minutes)</Label>
                      <Input
                        id="live-duration"
                        type="number"
                        value={sessionData.duration}
                        onChange={(e) =>
                          setSessionData({ ...sessionData, duration: e.target.value })
                        }
                        placeholder="60"
                        min="15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-max-students">Nombre max d'étudiants</Label>
                      <Input
                        id="live-max-students"
                        type="number"
                        value={sessionData.maxStudents}
                        onChange={(e) =>
                          setSessionData({ ...sessionData, maxStudents: e.target.value })
                        }
                        placeholder="100"
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setNewSessionDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-gradient-primary">
                      Planifier
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Contrôle Live */}
          <div className="mb-6">
            <Card className={isLive ? "border-2 border-destructive bg-destructive/5" : ""}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">
                        {isLive ? "Session Live en Cours" : "Démarrer une Session Live"}
                      </h3>
                      {isLive && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                          <span className="text-sm font-semibold text-destructive">EN DIRECT</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isLive
                        ? "Votre session est actuellement en direct"
                        : "Commencez une session de cours en direct maintenant"}
                    </p>
                    {isLive && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Durée</p>
                          <p className="text-lg font-semibold">{formatDuration(liveDuration)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Spectateurs</p>
                          <p className="text-lg font-semibold">{liveViewers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Qualité</p>
                          <p className="text-lg font-semibold">HD 720p</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {isLive ? (
                    <Button onClick={handleStopLive} variant="destructive" size="lg">
                      <StopCircle className="h-5 w-5 mr-2" />
                      Arrêter le Live
                    </Button>
                  ) : (
                    <Button onClick={handleStartLive} className="bg-gradient-primary" size="lg">
                      <Play className="h-5 w-5 mr-2" />
                      Démarrer le Live
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions planifiées */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sessions Planifiées</h3>
              <Badge variant="outline">{upcomingSessions.length} session(s)</Badge>
            </div>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">Aucune session planifiée</p>
              </div>
            ) : (
              upcomingSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{session.title}</h4>
                          {getStatusBadge(session.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-semibold">{session.scheduledDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Heure</p>
                              <p className="text-sm font-semibold">{session.scheduledTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Durée</p>
                              <p className="text-sm font-semibold">{session.duration} min</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Inscrits</p>
                              <p className="text-sm font-semibold">
                                {session.students}/{session.maxStudents}
                              </p>
                            </div>
                          </div>
                        </div>
                        {session.students > 0 && (
                          <div className="mb-2">
                            <Progress
                              value={(session.students / session.maxStudents) * 100}
                              className="h-2"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Lien: {session.link}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => handleShareSession(session.link)}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartSession(session.id)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Démarrer
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditSession(session.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareSession(session.link)}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Partager
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="h-4 w-4 mr-2" />
                              Notifier les étudiants
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteSession(session.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
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

          {/* Sessions en cours */}
          {activeSessions.length > 0 && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sessions en Cours</h3>
                <Badge variant="default" className="bg-green-500">
                  {activeSessions.length} active(s)
                </Badge>
              </div>
              {activeSessions.map((session) => (
                <Card key={session.id} className="border-2 border-green-500 bg-green-500/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-1">{session.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.students} étudiants connectés
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir la session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Sessions terminées */}
          {pastSessions.length > 0 && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sessions Terminées</h3>
                <Badge variant="secondary">{pastSessions.length} terminée(s)</Badge>
              </div>
              {pastSessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{session.title}</h4>
                          {getStatusBadge(session.status)}
                          {session.recording && (
                            <Badge variant="outline" className="gap-1">
                              <Video className="h-3 w-3" />
                              Enregistré
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{session.scheduledDate} à {session.scheduledTime}</span>
                          <span>{session.duration} min</span>
                          <span>{session.students} participants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.recording && (
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Voir l'enregistrement
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorLivePage;
