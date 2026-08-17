import { About } from "../components/About";
import { BusinessGrid } from "../components/BusinessGrid";
import { Contact } from "../components/Contact";
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
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
