import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import BoothCta from "./BoothCta";
import Footer from "./Footer";

export default function App() {
  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
