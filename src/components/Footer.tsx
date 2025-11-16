import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section - Leftmost */}
          <div>
            {/* Logo and Brand Name - Side by side */}
            <div className="flex items-start gap-3 mb-3">
              {/* Logo */}
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">J</span>
              </div>
              {/* Brand Name */}
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary leading-tight">
                  Jangalma Code
                </h2>
              </div>
            </div>
            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              La plateforme d'apprentissage numérique 100% sénégalaise pour tous.
            </p>
          </div>

          {/* Plateforme Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Plateforme</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cours" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cours
                </Link>
              </li>
              <li>
                <Link to="/domaines" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Domaines
                </Link>
              </li>
              <li>
                <Link to="/instructeurs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Instructeurs
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Suivez-nous Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-2 border-primary/30 rounded-full flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-2 border-primary/30 rounded-full flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-2 border-primary/30 rounded-full flex items-center justify-center hover:border-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border-2 border-primary/30 rounded-full flex items-center justify-center hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Jangalma Code. Tous droits réservés. Made with ❤️ au Sénégal SN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
