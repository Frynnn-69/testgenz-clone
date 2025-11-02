import React from "react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none text-gray-900 dark:text-gray-800">
          Chill dulu.
        </h1>
        <p className="mb-8 text-lg text-gray-500 dark:text-gray-800">
          Kenali Dirimu.
          <br/>
          Temui Versi Terbaikmu.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-7 text-base font-medium text-white bg-cinnamon_brandy rounded-lg hover:bg-nomadic_desert focus:ring-4 focus:ring-blue-300"
        >
          Mulai Tes Yuk!
        </a>
      </div>
    </section>
  );
}
