import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { BookingProvider } from "@/components/BookingProvider";
import {
  IntroStatement,
  AboutSebastian,
  Philosophy,
} from "@/components/Editorial";
import { TrainingExperience } from "@/components/TrainingExperience";
import { GoalSelector } from "@/components/GoalSelector";
import { Packages } from "@/components/Packages";
import { Location } from "@/components/Location";
import { FinalCTA, Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <main id="main">
        <Hero />
        <IntroStatement />
        <AboutSebastian />
        <TrainingExperience />
        <GoalSelector />
        <Philosophy />
        <Packages />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <Motion />
    </BookingProvider>
  );
}
