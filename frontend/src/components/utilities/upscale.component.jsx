import React from "react";
import ReactCompareImage from "react-compare-image";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import pani from "../images/pani.jpg";
import fish from "../images/fish.jpg";

const Upscale = () => {
  return (
    <section className="pt-10 pb-20">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap items-center -mx-5 gap-y-8">
          <div className="md:w-5/12 w-full px-5">
            <h3 className="mb-5 lg:text-[45px] text-3xl leading-tight font-bold max-w-[658px]">
              Upscale pictures
              <br />
              without losing quality up to 16x
            </h3>
            <p className="text-lg text-gray-700 max-w-[480px]">
              Make your pics high resolution - HD, 4k and beyond. Enlarge and
              sharpen photos for printing and web in a single click.
            </p>
          </div>
          <div className="md:w-6/12 w-full px-5 ms-auto">
            <div className="rounded-2xl border-4 border-solid border-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.25)] overflow-hidden">
              <ReactCompareImage leftImage={fish} rightImage={pani} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upscale;
