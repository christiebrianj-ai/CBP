import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import ServiceArea from "@/components/ServiceArea";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <ServiceArea />
      <FAQ />
      <ContactForm />
    </>
  );
}
