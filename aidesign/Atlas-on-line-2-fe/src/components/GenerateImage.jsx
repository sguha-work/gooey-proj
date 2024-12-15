import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(()=>{
    setTimeout(()=>{
      jQuery('html, body').animate({
        scrollTop: jQuery("#main-container").offset().top
    }, 100)
    },500)
  },[])
  // Function to handle form submission
  const handleGenerateImage = async () => {
    setLoading(true);
    setError("");
    setImageUrl(""); // Clear previous image

    try {
      const response = await fetch("http://212.64.220.94:3000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setImageUrl(data.data[0]?.url); // Assuming `image_url` is in the response
      window.setTimeout(()=>{
        jQuery('html, body').animate({
          scrollTop: jQuery("#image-result").offset().top
      }, 2000)
      },500)
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url) => {
    if (url) {
      try {
        // Replace third-party URL with your proxy endpoint
        const proxyUrl = `http://212.64.220.94:3000/proxy-image?url=${encodeURIComponent(
          url
        )}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error("Failed to download image");
        }

        const blob = await response.blob();
        const link = document.createElement("a");
        const imageUrl = URL.createObjectURL(blob);
        link.href = imageUrl;
        link.download = "image.png"; // Name of the downloaded file
        link.click();
        URL.revokeObjectURL(imageUrl);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    }
  };
  const gotoAtlaschat = () => {
    window.location.href = "https://atlaschat.io/"
  }
  return (
    <div id="main-container" className="text-gray-800 font-jost">
      <div className="fixed inset-0"><img src="assets/images/body-bg.jpg" alt="" className="w-full h-full object-cover" /></div>
      <div className="overflow-hidden fixed inset-0 before:fixed before:inset-0 before:bg-black before:bg-opacity-90">
        <div className="w-[30vw] h-[30vw] rounded-full opacity-20 bg-[#FF3535] blur-[5rem] absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-[20vw] h-[20vw] rounded-full opacity-80 bg-[#3FA9F5] blur-[10rem] absolute bottom-0 right-[10vw]" />
        <div className="w-[20vw] h-[20vw] rounded-full opacity-30 bg-[#FFC835] blur-[5rem] absolute top-1/2 left-[10%]" />
        <div className="w-[40vw] h-[40vw] rounded-full lg:opacity-40 bg-[#3FA9F5] blur-[15rem] absolute -top-1/4 -right-[30vw]" />
      </div>
      <header className="sticky top-0 z-20 text-white bg-[#0d0c17] bg-opacity-70 backdrop-blur-[3px] duration-300">
        <div className="xl:container mx-auto px-4 py-3 relative">
          <div className="flex flex-wrap justify-center items-center">
            <div className="nav-logo mr-8">
              <a href="/" className="custom-logo-link">
                <img src="assets/images/logo.png" alt="Logo" width="300" />
              </a>
            </div>
            <button
              type="button"
              className="sm:ml-auto lg:px-10 px-4 py-3 flex items-center rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
              onClick={gotoAtlaschat}
            >
              Back to Atlas Chat
            </button>
          </div>
        </div>
      </header>
      <section className="xl:pt-10 pt-20 relative flex items-center text-white">
        <div className="xl:container mx-auto px-4 relative">
          <div className="flex flex-col justify-center items-center gap-y-10">
            <div className="2xl:max-w-[862px] xl:max-w-[768px] max-w-[768px] px-4 text-center">
              <img
                src="assets/images/atlaschataidesign-logo.png"
                alt="Atlas chat Ai design"
                width="204"
                height="218"
                className="inline-block"
              />

              <div className="mt-8 flex flex-col items-center gap-y-6 text-white [&_h1]:capitalize [&_h1_strong]:font-semibold [&_h1_strong]:bg-gradient-to-r [&_h1_strong]:from-purple-400 [&_h1_strong]:via-pink-500 [&_h1_strong]:to-red-500 [&_h1_strong]:bg-clip-text [&_h1_strong]:text-transparent [&_p]:text-lg [&_p]:font-light text-center">
                <h1 className="xl:text-[45px] lg:text-4xl text-3xl font-semibold leading-tight ">
                  The Best AI <strong>Art Generator</strong>
                </h1>
                <p>
                  Fix dark, blurry, and oversaturated photos with our free
                  online image enhancer. Instantly improve image quality using
                  AI for easy download or sharing on social media apps.
                </p>
              </div>
            </div>
            <div className="2xl:max-w-[1296px] px-4 text-center w-full">
              <div className="w-full xl:mt-2 rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md">
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  
                  className="block w-full rounded-full border-0 ring-1 ring-inset ring-[#EE4172] ring-opacity-40 xl:py-8 sm:py-6 py-4 pl-6 lg:pr-56 pr-36 text-lg text-white bg-transparent placeholder:text-gray-500 font-light focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-purple-600 sm:leading-6 duration-150"
                  placeholder="Start creating magic"
                />
                <button
                  // type="submit"
                  onClick={handleGenerateImage}
                  className="lg:px-10 px-4 absolute inset-y-0 top-2 bottom-2 right-2 flex items-center rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Now"}
                </button>
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:py-12 py-5 text-white relative">
        <div className="xl:container mx-auto px-4">
          <div className="max-w-[988px] mx-auto text-center relative [&_img]:inline[&_h2]:lg:text-[22px] [&_h2]:text-xl [&_h2]:leading-tight [&_h2]:font-medium [&_h2_strong]:font-medium [&_h2_strong]:text-[#9FFF77] flex flex-col lg:gap-y-8 gap-y-4 justify-center">
            <h2 className="">Explore Popular Tools</h2>

            <div className="inline-flex flex-wrap justify-center sm:gap-2 gap-1">
              {[
                { name: "Image Generator", path: "/" },
                { name: "Image Editing", path: "/edit" },
                { name: "Image Remixing", path: "/remix" },
                { name: "Image Upscale", path: "/upscale" },
                { name: "Image Describe", path: "/describe" },
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.path}
                  className="text-white bg-gradient-to-r from-[#3A7EF1] to-[#bb94ee] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 lg:text-lg text-smfont-light rounded-full lg:px-5 lg:py-2.5 px-2.5 py-1.5 text-center inline-flex items-center"
                >
                  <img
                    src="assets/images/img-icon.svg"
                    alt=""
                    className="mr-2"
                  />
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
          {imageUrl && (
            <div id="image-result" className="max-w-[779px] mt-10 mx-auto p-8 text-center rounded-3xl border border-gray-500 bg-[#1E1E1E] flex flex-col gap-y-6">
              <h3 className="text-lg text-[#959595]">Image result</h3>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Image Result"
                  width="1176"
                  height="787"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                // type="submit"
                onClick={() => handleDownload(imageUrl)}
                className="w-full block xl:px-10 sm:px-6 px-4 sm:py-5 py-2.5 text-lg rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
              >
                Download
              </button>
            </div>
          )}
        </div>
      </section>
      <footer className="pt-10 pb-8 relative text-white">
        <div className="relative">
          <div className="xl:container mx-auto px-4 relative">
            <div className="flex flex-wrap items-center justify-center max-md:text-center -mx-4 md:gap-y-10 gap-y-5">
              <div className="md:w-6/12 w-full px-4 md:order-first">
                <p className="text-center">
                  Copyright &copy; 2024 All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GenerateImage;
