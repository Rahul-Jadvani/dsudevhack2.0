"use client";
import React from "react";

const Glimpses = () => {
  const images = [
    "/glimpses/1.jpg",
    "/glimpses/2.jpg",
    "/glimpses/3.jpg",
    "/glimpses/4.jpg",
    "/glimpses/5.jpg",
    "/glimpses/6.jpg",
    "/glimpses/7.jpg",
    "/glimpses/8.jpg",
    "/glimpses/9.jpg",
    "/glimpses/10.jpg",
    "/glimpses/11.jpg",
    "/glimpses/12.jpg",
    "/glimpses/13.jpg",
    "/glimpses/14.jpg",
    "/glimpses/15.jpg",
    "/glimpses/16.jpg",
    "/glimpses/17.jpg",
    "/glimpses/18.jpg",
    "/glimpses/19.jpg",
    "/glimpses/20.jpg",
  ];

  let idx = 0;

  const getImg = () => {
    const src = images[idx % images.length];
    idx++;
    return (
      <img
        src={src}
        alt="glimpse"
        className="w-24 h-24 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
      />
    );
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Glimpses
        </h2>

        {/* 7x7 Grid approximating cube boundary */}
        <div className="grid grid-cols-7 gap-3 justify-items-center">
          {/* Row 1 */}
          <div></div><div></div>{getImg()}{getImg()}{getImg()}<div></div><div></div>

          {/* Row 2 */}
          <div></div>{getImg()}{getImg()}{getImg()}{getImg()}{getImg()}<div></div>

          {/* Row 3 */}
          {getImg()}{getImg()}{getImg()}<div></div>{getImg()}{getImg()}{getImg()}

          {/* Row 4 (middle row) */}
          {getImg()}{getImg()}<div></div>{getImg()}<div></div>{getImg()}{getImg()}

          {/* Row 5 */}
          {getImg()}{getImg()}{getImg()}<div></div>{getImg()}{getImg()}{getImg()}

          {/* Row 6 */}
          <div></div>{getImg()}{getImg()}{getImg()}{getImg()}{getImg()}<div></div>

          {/* Row 7 */}
          <div></div><div></div>{getImg()}{getImg()}{getImg()}<div></div><div></div>
        </div>
      </div>
    </section>
  );
};

export default Glimpses;
