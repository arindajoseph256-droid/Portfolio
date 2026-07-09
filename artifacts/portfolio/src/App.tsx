import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme-provider';
import { ServiceWorkerRegister } from '@/components/layout/service-worker-register';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/layout/back-to-top';
import { TechMarquee } from '@/components/layout/tech-marquee';
import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Skills } from '@/sections/skills';
import { Projects } from '@/sections/projects';
import { Experience } from '@/sections/experience';
import { Education } from '@/sections/education';
import { Certifications } from '@/sections/certifications';
import { Achievements } from '@/sections/achievements';
import { Services } from '@/sections/services';
import { Testimonials } from '@/sections/testimonials';
import { Blog } from '@/sections/blog';
import { Gallery } from '@/sections/gallery';
import { Contact } from '@/sections/contact';

const queryClient = new QueryClient();

function Portfolio() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechMarquee />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Services />
      <Testimonials />
      <Blog />
      <Gallery />
      <Contact />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ServiceWorkerRegister />
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main>
          <Portfolio />
        </main>
        <Footer />
        <BackToTop />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
