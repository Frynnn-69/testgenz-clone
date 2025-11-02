// src/app/page.tsx
'use client';
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero />
      <Footer />
    </>
  );
}