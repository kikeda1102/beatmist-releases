import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Highlights from "./Highlights";
import Download from "./Download";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Download />
        <Pricing />
        {/* <Contact /> */}
      </main>
      <Footer />
    </TranslationProvider>
  );
}
