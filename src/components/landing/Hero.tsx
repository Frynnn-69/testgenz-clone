import React from "react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-start hero-section">
      <div className="px-8 mx-auto max-w-4xl text-left">
        <h3 className="hero-title mb-4">Chill dulu.</h3>
        <h3 className="hero-subtitle mb-6">Kenali Dirimu,</h3>
        <h3 className="hero-title mb-4">Temui Versi Terbaik mu.</h3>

        <p className="hero-description">
          Chill dulu. Dunia terus berputar, tapi kamu berhak ambil jeda buat kenal diri
          lebih dalam. Tes ini bantu kamu pahami kekuatan, minat, dan arah hidupmu dengan
          cara yang santai, jujur, dan berbasis sains.
        </p>

        {/* Tombol Ayo Test dengan panah di lingkaran nempel */}
        <div className="hero-btn-wrapper mt-10">
          <a href="#" className="hero-btn">
            <span className="hero-btn-text">Ayo Test</span>
          </a>
          <div className="hero-btn-circle">
            <span className="hero-btn-arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
