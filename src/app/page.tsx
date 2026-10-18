import { Nav } from "@/components/layout/Nav";
import { ScrollRail } from "@/components/layout/ScrollRail";
import { Footer } from "@/components/layout/Footer";
import { sections } from "@/content";

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <Nav />
      <ScrollRail />
      <main id="main" className="relative z-10">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="flex min-h-screen items-center">
            <h2 className="display wrap text-6xl">{s.label}</h2>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
