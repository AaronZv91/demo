import { About } from "../components/About";
import { BusinessGrid } from "../components/BusinessGrid";
import { Contact } from "../components/Contact";
import { CoreValuesSection } from "../components/CoreValuesSection";
import { EsgSection } from "../components/EsgSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ScrollScrub } from "../components/ScrollScrub";

export default function Home() {
  return (
    <>
      <div className="d01">
        <Header />
        <main>
          <ScrollScrub />
          <BusinessGrid />
          <About />
          <EsgSection />
          <CoreValuesSection variant="d01" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
