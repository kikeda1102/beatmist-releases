import { TranslationProvider } from "../i18n";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Highlights from "./Highlights";
import Pricing from "./Pricing";
import Footer from "./Footer";

export default function App() {
  return (
    <TranslationProvider>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </TranslationProvider>
  );
}
