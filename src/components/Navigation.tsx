import { BookOpen, BarChart3, Users, Upload, Radio, MessageSquare, UserCircle, GraduationCap, Info, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === "/tableau-de-bord-instructeur") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const isInstructorInterface = location.pathname.startsWith("/interface-instructeur") || location.pathname.startsWith("/tableau-de-bord-instructeur");
  
  const handleLogin = () => {
    navigate("/connexion");
  };
  
  const handleSignup = () => {
    navigate("/inscription");
  };

  // Liens pour les étudiants
  const studentLinks: Array<{ to: string; label: string; icon: React.ComponentType<{ className?: string }>; state?: { tab?: string } }> = [
    { to: "/cours", label: "Cours", icon: GraduationCap },
    { to: "/domaines", label: "Domaines", icon: BookOpen },
    { to: "/instructeurs", label: "Instructeurs", icon: Users },
    { to: "/apropos", label: "À propos", icon: Info },
    { to: "/tableau-de-bord", label: "Tableau de bord", icon: BarChart3 },
  ];

  // Liens pour les instructeurs
  const instructorLinks: Array<{ to: string; label: string; icon: React.ComponentType<{ className?: string }>; state?: { tab?: string } }> = [
    { to: "/tableau-de-bord-instructeur", label: "Tableau de bord", icon: BookOpen },
    { to: "/interface-instructeur/etudiants", label: "Mes Étudiants", icon: Users },
    { to: "/interface-instructeur/creer-cours", label: "Créer un Cours", icon: Upload },
    { to: "/interface-instructeur/live", label: "Cours Live", icon: Radio },
    { to: "/interface-instructeur/chat", label: "Chat", icon: MessageSquare },
    { to: "/interface-instructeur/profil", label: "Profil", icon: UserCircle },
  ];

  const links = isInstructorInterface ? instructorLinks : studentLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-primary">
              Jangalma Code
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  state={link.state || undefined}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Boutons Connexion/Inscription Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" onClick={handleLogin}>
              Connexion
            </Button>
            <Button className="bg-gradient-primary" onClick={handleSignup}>
              Inscription
            </Button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Expanded */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to + link.label}
                    to={link.to}
                    state={link.state || undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="ghost" onClick={handleLogin} className="w-full justify-start">
                  Connexion
                </Button>
                <Button className="w-full bg-gradient-primary justify-start" onClick={handleSignup}>
                  Inscription
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
