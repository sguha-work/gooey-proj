import React, { useState } from "react";
import F1 from "../images/F1.png";
import F2 from "../images/F2.png";

export default function Feature() {
  return (
    <section className="py-20">
      <div className="max-w-[1640px] mx-auto px-5">
        <div className="flex flex-wrap items-center -mx-5">
          <div className="md:w-6/12 w-full px-5 ms-auto md:order-last">
            <img src={F1} alt="img2" />
          </div>
          <div className="md:w-5/12 w-full px-5 md:order-first">
            <h3 className="mb-10 lg:text-[45px] text-3xl leading-tight font-bold lg:max-w-[480px]">Print bravely with increased photo resolution</h3>
            <p className="text-lg text-gray-700 lg:max-w-[480px]">No need to save money on high-end cameras and scanners anymore. Freely and instantaneously upscale image quality with AI photo enhancer and get high-quality prints with minimal effort. Perfect when you want to print a personal memory for a large-sized frame, print advertisement materials, and so much more.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center -mx-5">
          <div className="md:w-6/12 w-full px-5 me-auto">
            <img src={F2} alt="img2" />
          </div>
          <div className="md:w-5/12 w-full px-5">
            <h3 className="mb-10 lg:text-[45px] text-3xl leading-tight font-bold lg:max-w-[480px]">Integrate the photo enhancer into your product via API</h3>
            <p className="text-lg text-gray-700 lg:max-w-[480px]">Port the image enhancer in all its glory to your product. Set up and
              get it running in no time. The pricing model is simple: you pay for
              what you use, with no minimums, and you get substantial discounts for
              high-volume usage. Learn more here.</p>
          </div>
        </div>
      </div>      
    </section>
  );
}
