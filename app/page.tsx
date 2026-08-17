import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Music from '@/components/Music/Music';
import Events from '@/components/Events/Events';
import Packages from '@/components/Packages/Packages';
import Gallery from '@/components/Gallery/Gallery';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Music />
      <Events />
      <Packages />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
