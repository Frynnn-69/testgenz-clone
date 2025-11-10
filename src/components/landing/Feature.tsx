"use client";

import React from "react";

export default function FeatureSection() {
  return (
    <section className="bg-[#FFEFDC] flex flex-col items-center justify-center min-h-screen py-20 px-6 md:px-12">
      {/* Wrapper utama */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
          <h2 className="about-title mb-6">ABOUT US</h2>
          <p className="text-[#5A3D35] text-lg md:text-xl max-w-3xl leading-relaxed">
            Chill dulu. Dunia terus berputar, tapi kamu berhak ambil jeda buat
            kenal diri lebih dalam. Tes ini bantu kamu pahami kekuatan, minat,
            dan arah hidupmu dengan cara yang santai, jujur, dan berbasis sains.
          </p>
        </div>

        {/* Grid Fitur - 4 Kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-20 place-items-center">
          {/* Item 1 */}
          <div className="about-item flex flex-col items-center text-center max-w-sm">
            <div className="icon-container flex justify-center items-center mb-6 w-16 h-16 rounded-full bg-[#DCC2B3] shadow-md">
              <svg
                className="w-8 h-8 text-[#5A3D35]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 
                  002 2h2.586l-1.293 1.293a1 1 
                  0 101.414 1.414L10 15.414l2.293 
                  2.293a1 1 0 001.414-1.414L12.414 
                  15H15a2 2 0 002-2V5a1 1 0 
                  100-2H3zm11.707 4.707a1 1 0 
                  00-1.414-1.414L10 9.586 8.707 
                  8.293a1 1 0 00-1.414 0l-2 
                  2a1 1 0 101.414 1.414L8 
                  10.414l1.293 1.293a1 1 0 
                  001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-[#5A3D35] text-xl font-semibold mb-3">
              Marketing
            </h3>
            <p className="text-[#6B4E44] text-base leading-relaxed">
              Plan it, create it, launch it. Collaborate seamlessly with your
              team and hit your goals every month.
            </p>
          </div>

          {/* Item 2 */}
          <div className="about-item flex flex-col items-center text-center max-w-sm">
            <div className="icon-container flex justify-center items-center mb-6 w-16 h-16 rounded-full bg-[#DCC2B3] shadow-md">
              <svg
                className="w-8 h-8 text-[#5A3D35]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 
                0l-7 3a1 1 0 000 1.84L5.25 
                8.051a.999.999 0 
                01.356-.257l4-1.714a1 1 0 
                11.788 1.838L7.667 9.088l1.94.831a1 
                1 0 00.787 0l7-3a1 1 0 
                000-1.838l-7-3zM3.31 9.397L5 
                10.12v4.102a8.969 8.969 0 
                00-1.05-.174 1 1 0 
                01-.89-.89 11.115 11.115 0 
                01.25-3.762zM9.3 16.573A9.026 
                9.026 0 007 14.935v-3.957l1.818.78a3 
                3 0 002.364 0l5.508-2.361a11.026 
                11.026 0 01.25 3.762 1 1 0 
                01-.89.89 8.968 8.968 0 
                00-5.35 2.524 1 1 0 
                01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 
                8.935 0 00-2-.712V17a1 1 0 
                001 1z" />
              </svg>
            </div>
            <h3 className="text-[#5A3D35] text-xl font-semibold mb-3">
              Legal
            </h3>
            <p className="text-[#6B4E44] text-base leading-relaxed">
              Protect your organization, devices, and stay compliant with
              structured workflows designed for you.
            </p>
          </div>

          {/* Item 3 */}
          <div className="about-item flex flex-col items-center text-center max-w-sm">
            <div className="icon-container flex justify-center items-center mb-6 w-16 h-16 rounded-full bg-[#DCC2B3] shadow-md">
              <svg
                className="w-8 h-8 text-[#5A3D35]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 
                  013 3v1h2a2 2 0 012 
                  2v3.57A22.952 22.952 0 
                  0110 13a22.95 22.95 0 
                  01-8-1.43V8a2 2 0 012-2h2zm2-1a1 
                  1 0 011-1h2a1 1 0 
                  011 1v1H8V5zm1 5a1 1 0 
                  011-1h.01a1 1 0 110 2H10a1 
                  1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 
                  2h12a2 2 0 002-2v-2.308A24.974 
                  24.974 0 0110 15c-2.796 
                  0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h3 className="text-[#5A3D35] text-xl font-semibold mb-3">
              Business Automation
            </h3>
            <p className="text-[#6B4E44] text-base leading-relaxed">
              Auto-assign tasks, send Slack messages, and more with templates
              that help you get started quickly.
            </p>
          </div>

          {/* Item 4 - Tambahan */}
          <div className="about-item flex flex-col items-center text-center max-w-sm">
            <div className="icon-container flex justify-center items-center mb-6 w-16 h-16 my-1.5 rounded-full bg-[#DCC2B3] shadow-md">
              <svg
                className="w-8 h-8 text-[#5A3D35]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a8 8 0 100 16 8 8 0 
                  000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                />
              </svg>
            </div>
            <h3 className="text-[#5A3D35] text-xl font-semibold mb-3">
              Personal Growth
            </h3>
            <p className="text-[#6B4E44] text-base leading-relaxed">
              Discover your potential, track progress, and take actionable steps
              toward self-improvement every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
