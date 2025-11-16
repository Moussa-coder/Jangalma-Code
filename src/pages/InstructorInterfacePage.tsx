import { Outlet } from "react-router-dom";
import { BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const InstructorInterfacePage = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-4 pb-16 transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="mb-6 pt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Interface Instructeur</h1>
                <p className="text-muted-foreground">
                  Gérez vos cours, vos étudiants et votre contenu pédagogique
                </p>
              </div>
            </div>
          </div>

          {/* Contenu de la page sélectionnée */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorInterfacePage;

