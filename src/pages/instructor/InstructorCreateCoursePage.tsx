import { useState } from "react";
import { 
  Upload, FileText, Video, File, X, Check, Image as ImageIcon, 
  Plus, Trash2, Eye, Save, AlertCircle, FileCheck, Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

type FileType = "pdf" | "word" | "video" | null;

interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  size: number;
  file: File;
  uploadProgress: number;
  status: "uploading" | "completed" | "error";
}

const InstructorCreateCoursePage = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    domain: "",
    level: "",
    price: "",
    duration: "",
    language: "fr",
    tags: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileType: FileType =
        file.type === "application/pdf"
          ? "pdf"
          : file.type.includes("word") || file.name.endsWith(".docx") || file.name.endsWith(".doc")
          ? "word"
          : file.type.startsWith("video/")
          ? "video"
          : null;

      if (fileType) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: fileType,
          size: file.size,
          file: file,
          uploadProgress: 0,
          status: "uploading",
        };
        setUploadedFiles((prev) => [...prev, newFile]);
        
        // Simulation d'upload
        simulateUpload(newFile.id);
        toast.success(`Fichier ${file.name} ajouté`);
      } else {
        toast.error(`Format non supporté pour ${file.name}`);
      }
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                uploadProgress: progress,
                status: progress >= 100 ? "completed" : "uploading",
              }
            : f
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("Fichier supprimé");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseData.title || !courseData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.error("Veuillez ajouter au moins un fichier (PDF, Word ou Vidéo)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulation d'upload du cours
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          toast.success("Cours créé avec succès !");
          setCourseData({
            title: "",
            description: "",
            domain: "",
            level: "",
            price: "",
            duration: "",
            language: "fr",
            tags: "",
          });
          setUploadedFiles([]);
          setUploadProgress(0);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "word":
        return File;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const totalFileSize = uploadedFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Créer un Nouveau Cours</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Ajoutez vos cours en format PDF, Word ou Vidéo
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Masquer" : "Aperçu"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations du cours */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Informations du Cours
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">
                    Titre du cours <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    placeholder="Ex: Introduction à React - Guide Complet"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    placeholder="Décrivez votre cours en détail..."
                    rows={5}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {courseData.description.length}/500 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Domaine</Label>
                  <Select
                    value={courseData.domain}
                    onValueChange={(value) => setCourseData({ ...courseData, domain: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Développement Web</SelectItem>
                      <SelectItem value="mobile">Développement Mobile</SelectItem>
                      <SelectItem value="ai">Intelligence Artificielle</SelectItem>
                      <SelectItem value="marketing">Marketing Digital</SelectItem>
                      <SelectItem value="design">Design UI/UX</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="cyber">Cybersécurité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Niveau</Label>
                  <Select
                    value={courseData.level}
                    onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="avance">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                    placeholder="0"
                    min="0"
                  />
                  {courseData.price && (
                    <p className="text-xs text-muted-foreground">
                      {parseInt(courseData.price || "0").toLocaleString()} FCFA
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Durée estimée</Label>
                  <Input
                    id="duration"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    placeholder="Ex: 5h 30min"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select
                    value={courseData.language}
                    onValueChange={(value) => setCourseData({ ...courseData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="ar">Arabe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={courseData.tags}
                    onChange={(e) => setCourseData({ ...courseData, tags: e.target.value })}
                    placeholder="Ex: React, JavaScript, Frontend"
                  />
                </div>
              </div>
            </div>

            {/* Upload de fichiers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Fichiers du Cours
                </h3>
                <div className="text-sm text-muted-foreground">
                  {uploadedFiles.length} fichier{uploadedFiles.length > 1 ? "s" : ""} •{" "}
                  {formatFileSize(totalFileSize)}
                </div>
              </div>

              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-primary font-semibold hover:underline">
                    Cliquez pour télécharger
                  </span>
                  <span className="text-muted-foreground"> ou glissez-déposez vos fichiers</span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.mkv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Formats supportés : PDF, Word (.doc, .docx), Vidéo (.mp4, .avi, .mov, .mkv)
                </p>
                <p className="text-xs text-muted-foreground">
                  Taille maximale par fichier : 500 MB
                </p>
              </div>

              {/* Liste des fichiers uploadés */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Fichiers ajoutés ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => {
                      const Icon = getFileIcon(file.type);
                      return (
                        <Card key={file.id} className="p-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{file.name}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{formatFileSize(file.size)}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="capitalize text-xs">
                                    {file.type}
                                  </Badge>
                                  {file.status === "uploading" && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Upload en cours...
                                      </span>
                                    </>
                                  )}
                                  {file.status === "completed" && (
                                    <>
                                      <span>•</span>
                                      <span className="text-primary flex items-center gap-1">
                                        <Check className="h-3 w-3" />
                                        Terminé
                                      </span>
                                    </>
                                  )}
                                </div>
                                {file.status === "uploading" && (
                                  <Progress value={file.uploadProgress} className="mt-2 h-1" />
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {uploadedFiles.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Aucun fichier ajouté. Veuillez ajouter au moins un fichier pour créer le cours.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Aperçu */}
            {previewMode && courseData.title && (
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold">Aperçu du Cours</h3>
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-2">{courseData.title}</h4>
                    <p className="text-muted-foreground mb-4">{courseData.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {courseData.domain && (
                        <Badge variant="outline">Domaine: {courseData.domain}</Badge>
                      )}
                      {courseData.level && (
                        <Badge variant="outline">Niveau: {courseData.level}</Badge>
                      )}
                      {courseData.duration && (
                        <Badge variant="outline">Durée: {courseData.duration}</Badge>
                      )}
                      {courseData.price && (
                        <Badge variant="outline">
                          Prix: {parseInt(courseData.price).toLocaleString()} FCFA
                        </Badge>
                      )}
                    </div>
                    {courseData.tags && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {courseData.tags.split(",").map((tag, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Barre de progression globale */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Création du cours en cours...</span>
                  <span className="font-semibold">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" disabled={isUploading}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-gradient-primary"
                disabled={isUploading || uploadedFiles.length === 0}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Créer le cours
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCreateCoursePage;
