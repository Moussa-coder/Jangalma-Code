import { useState, useRef } from "react";
import { UserCircle, Save, Mail, Phone, Globe, Linkedin, Github, Twitter, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const InstructorProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    firstName: "Amadou",
    lastName: "Diop",
    email: "amadou.diop@jangalma-code.sn",
    phone: "+221 77 123 45 67",
    title: "Expert Full Stack & Architecte Logiciel",
    domain: "Développement Web",
    bio: "Développeur full stack avec plus de 10 ans d'expérience dans la création d'applications web scalables. Passionné par l'enseignement et le partage de connaissances.",
    experience: "Lead Full Stack Developer chez Tech Solutions Africa depuis 2020. Ancien Senior Web Developer chez Digital Innovations (2017-2020).",
    education: "Master en Informatique - Université Cheikh Anta Diop de Dakar",
    website: "https://amadoudiop.dev",
    linkedin: "https://linkedin.com/in/amadoudiop",
    github: "https://github.com/amadoudiop",
    twitter: "https://twitter.com/amadoudiop",
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleSave = () => {
    toast.success("Profil mis à jour avec succès !");
  };

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Format de fichier non supporté. Utilisez JPG, PNG ou GIF.");
      return;
    }

    // Vérifier la taille (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
    if (file.size > maxSize) {
      toast.error("Le fichier est trop volumineux. Taille max : 2MB");
      return;
    }

    // Créer une URL pour l'aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
      toast.success("Photo sélectionnée avec succès !");
    };
    reader.onerror = () => {
      toast.error("Erreur lors de la lecture du fichier");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Mon Profil</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Modifiez vos informations personnelles et professionnelles
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            {/* Photo de profil */}
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-24 w-24">
                {avatarUrl && <AvatarImage src={avatarUrl} alt="Photo de profil" />}
                <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={handlePhotoClick}>
                  Changer la photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG ou GIF. Taille max : 2MB
                </p>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                Informations Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Informations Professionnelles
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre Professionnel</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Ex: Expert Full Stack Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domaine d'Expertise</Label>
                  <Input
                    id="domain"
                    value={profileData.domain}
                    onChange={(e) => handleChange("domain", e.target.value)}
                    placeholder="Ex: Développement Web"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience Professionnelle</Label>
                  <Textarea
                    id="experience"
                    value={profileData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    rows={3}
                    placeholder="Décrivez votre expérience..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Formation</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="education"
                      value={profileData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                      rows={2}
                      placeholder="Vos diplômes et formations..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Réseaux Sociaux et Liens
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Site Web / Portfolio</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="https://votresite.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/votreprofil"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github"
                      type="url"
                      value={profileData.github}
                      onChange={(e) => handleChange("github", e.target.value)}
                      placeholder="https://github.com/votreprofil"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      type="url"
                      value={profileData.twitter}
                      onChange={(e) => handleChange("twitter", e.target.value)}
                      placeholder="https://twitter.com/votreprofil"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline">
                Annuler
              </Button>
              <Button type="submit" className="bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfilePage;

