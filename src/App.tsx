import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AboutPage from "./pages/AboutPage";
import DomainsPage from "./pages/DomainsPage";
import InstructorsPage from "./pages/InstructorsPage";
import InstructorDetailPage from "./pages/InstructorDetailPage";
import DashboardPage from "./pages/DashboardPage";
import InstructorDashboardPage from "./pages/InstructorDashboardPage";
import InstructorInterfacePage from "./pages/InstructorInterfacePage";
import InstructorStudentsPage from "./pages/instructor/InstructorStudentsPage";
import InstructorCreateCoursePage from "./pages/instructor/InstructorCreateCoursePage";
import InstructorLivePage from "./pages/instructor/InstructorLivePage";
import InstructorChatPage from "./pages/instructor/InstructorChatPage";
import InstructorProfilePage from "./pages/instructor/InstructorProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import InstructorSignupPage from "./pages/InstructorSignupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cours" element={<CoursesPage />} />
          <Route path="/cours/:id" element={<CourseDetailPage />} />
          <Route path="/domaines" element={<DomainsPage />} />
          <Route path="/instructeurs" element={<InstructorsPage />} />
          <Route path="/instructeurs/:id" element={<InstructorDetailPage />} />
          <Route path="/apropos" element={<AboutPage />} />
          <Route path="/tableau-de-bord" element={<DashboardPage />} />
          <Route path="/tableau-de-bord-instructeur" element={<InstructorDashboardPage />} />
          <Route path="/interface-instructeur" element={<InstructorInterfacePage />}>
            <Route path="etudiants" element={<InstructorStudentsPage />} />
            <Route path="creer-cours" element={<InstructorCreateCoursePage />} />
            <Route path="live" element={<InstructorLivePage />} />
            <Route path="chat" element={<InstructorChatPage />} />
            <Route path="profil" element={<InstructorProfilePage />} />
          </Route>
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/inscription-instructeur" element={<InstructorSignupPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
