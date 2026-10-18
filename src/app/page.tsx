import { Nav } from "@/components/layout/Nav";
import { ScrollRail } from "@/components/layout/ScrollRail";
import { Footer } from "@/components/layout/Footer";
import { Scene } from "@/components/three/Scene";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <Scene />
      <Nav />
      <ScrollRail />
      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
