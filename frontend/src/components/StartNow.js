import React from "react";
import image2 from "../components/images/image2.png";
import { Button } from "bootstrap";

export default function StartNow() {
  return (
    <section className="py-20 bg-gray-200">
      <div className="max-w-[1640px] mx-auto px-5">
        <div className="max-w-[1277px] mx-auto text-center">
            <h3 className="mb-5 lg:text-[45px] text-3xl leading-tight font-bold">The only image enhancer you’ll ever need</h3>
            <p className="text-lg text-gray-700 mb-5">Port the image enhancer in all its glory to your product. Set up and get it running in no time. The pricing model is simple: you pay for what you use, with no minimums, and you get substantial discounts for high-volume usage. Learn more <a href="#">here</a>.
            </p>
            <button className="px-8 py-3 text-lg leading-normal font-medium text-white rounded-[0.625rem] bg-[#0F113A] hover:bg-blue-950">
              Get Started Now
            </button>
        </div>
      </div>
    </section>
  );
}
