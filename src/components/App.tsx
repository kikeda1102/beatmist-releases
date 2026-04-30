import { useEffect } from "react";
import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Highlights from "./Highlights";
import Download from "./Download";
import ReleaseNotes from "./ReleaseNotes";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let cancelled = false;
    let lastTop = -1;
    let stableCount = 0;

    const poll = () => {
      if (cancelled) return;
      const el = document.querySelector(hash);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top === lastTop) {
        stableCount++;
      } else {
        stableCount = 0;
        lastTop = top;
      }

      if (stableCount >= 3) {
        el.scrollIntoView();
        return;
      }

      setTimeout(poll, 100);
    };

    document.fonts.ready.then(() => {
      if (!cancelled) poll();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Download />
        <ReleaseNotes />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
