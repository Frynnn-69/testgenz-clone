// src/app/page.tsx
'use client';
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Feature from "@/components/landing/Feature";

export default function Home() {
  return ( 
    <>
      <Navbar/>
      <Hero />
      <Feature />
      <Footer />
    </>
  );
}