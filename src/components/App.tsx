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

    // styled-componentsのスタイル注入とレイアウト完了を待つ
    const frameId = requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    });

    return () => cancelAnimationFrame(frameId);
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
