import type { Metadata } from "next";
import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { Overview } from "@/widgets/Overview";
import { Features } from "@/widgets/Features";
import { Workflow } from "@/widgets/Workflow";
import { Testimonials } from "@/widgets/Testimonials";
import { FAQ } from "@/widgets/FAQ";
import { CTA } from "@/widgets/CTA";
import { Footer } from "@/widgets/Footer";

export const metadata: Metadata = {
  title: "Novveris",
  description:
    "Novveris — веб-платформа для создания, оформления и публикации новелл. Авторы пишут истории, а читатели находят и читают их.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Overview />
        <Features />
        <Workflow />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
