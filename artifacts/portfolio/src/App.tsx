import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ThemeProvider } from '@/context/theme-provider';
import { ServiceWorkerRegister } from '@/components/layout/service-worker-register';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/layout/back-to-top';
import NotFound from '@/app/not-found';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ExperiencePage from '@/pages/ExperiencePage';
import EducationPage from '@/pages/EducationPage';
import CertificationsPage from '@/pages/CertificationsPage';
import AchievementsPage from '@/pages/AchievementsPage';
import ServicesPage from '@/pages/ServicesPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import BlogPage from '@/pages/BlogPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: 'easeIn'  as const } },
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">
          <AnimatedPage><HomePage /></AnimatedPage>
        </Route>
        <Route path="/about">
          <AnimatedPage><AboutPage /></AnimatedPage>
        </Route>
        <Route path="/skills">
          <AnimatedPage><SkillsPage /></AnimatedPage>
        </Route>
        <Route path="/projects">
          <AnimatedPage><ProjectsPage /></AnimatedPage>
        </Route>
        <Route path="/experience">
          <AnimatedPage><ExperiencePage /></AnimatedPage>
        </Route>
        <Route path="/education">
          <AnimatedPage><EducationPage /></AnimatedPage>
        </Route>
        <Route path="/certifications">
          <AnimatedPage><CertificationsPage /></AnimatedPage>
        </Route>
        <Route path="/achievements">
          <AnimatedPage><AchievementsPage /></AnimatedPage>
        </Route>
        <Route path="/services">
          <AnimatedPage><ServicesPage /></AnimatedPage>
        </Route>
        <Route path="/testimonials">
          <AnimatedPage><TestimonialsPage /></AnimatedPage>
        </Route>
        <Route path="/blog">
          <AnimatedPage><BlogPage /></AnimatedPage>
        </Route>
        <Route path="/gallery">
          <AnimatedPage><GalleryPage /></AnimatedPage>
        </Route>
        <Route path="/contact">
          <AnimatedPage><ContactPage /></AnimatedPage>
        </Route>
        <Route>
          <AnimatedPage><NotFound /></AnimatedPage>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ServiceWorkerRegister />
          <LoadingScreen />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="pt-24 min-h-screen">
            <Router />
          </main>
          <Footer />
          <BackToTop />
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
