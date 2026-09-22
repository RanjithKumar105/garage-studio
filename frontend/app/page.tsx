import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Services from "@/components/Services";
import ServiceJourney from "@/components/ServiceJourney";
import WhyChooseUs from "@/components/WhyChooseUs";
import BeforeAfter from "@/components/BeforeAfter";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statistics />
        <About />
        <Services />
        <ServiceJourney />
        <WhyChooseUs />
        <BeforeAfter />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CTA />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
