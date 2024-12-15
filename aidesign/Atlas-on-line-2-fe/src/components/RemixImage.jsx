import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RemixImage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [originalImage, setOriginalImage] = useState(null);
    const [remixedImage, setRemixedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('')

    const handleFileChange = (e) => {
        
        setImageFile(e.target.files[0]);
        setOriginalImage(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name)
      };

      const handleFileRemove = () => {
        setImageFile(null); 
        setOriginalImage(null);
        setFileName(""); 
      };
      
    
      const handlePromptChange = (e) => {
        setPrompt(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!imageFile || !prompt) {
          setError('Please upload an image and provide a prompt.');
          return;
        }
    
        setError('');
        setLoading(true);
        setRemixedImage(null);
    
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        formData.append('prompt', prompt);
    
        try {
          const response = await axios.post('http://212.64.220.94:3000/remix-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setRemixedImage(response.data.data[0]?.url);
        } catch (err) {
          console.error('Error:', err);
          setError('Failed to process the remix request');
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

  return (
    <div className="text-gray-800 font-jost">
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
            <Link
              to="/"
              className="sm:ml-auto lg:px-10 px-4 py-3 flex items-center rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
            >
              Back to Atlas Chat
            </Link>
          </div>
        </div>
      </header>
      <main className="main">
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
                  <h1 className="xl:text-[45px] lg:text-4xl text-3xl font-semibold leading-tight">
                    Image Remixing <strong>Tool</strong>
                  </h1>
                  <p>
                  Fix dark, blurry, and oversaturated photos with our free
                  online image enhancer. Instantly improve image quality using
                  AI for easy download or sharing on social media apps.
                </p>
                </div>
              </div>

              <div className="2xl:max-w-[1012px] lg:p-8 p-5 w-full rounded-3xl border border-gray-500 bg-[#1E1E1E]">
                <div className="flex flex-col gap-y-6">
                  {/* Upload Image Section */}
                  <div>
                    <label className="block mb-2 sm:text-lg text-gray-400">
                      Upload Image
                    </label>
                    <div className="w-full rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md">
                      
                      <div className="block w-full rounded-full border-0 ring-1 ring-inset ring-[#EE4172] ring-opacity-40 xl:py-5 sm:py-4 py-2.5 pl-6 pr-16 text-lg text-white bg-transparent placeholder:text-gray-500 font-light focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-purple-600 sm:leading-6 duration-150">
                        
                        <span
                          id="badge-dismiss-default"
                          className="inline-flex items-center pl-3 pr-1.5 py-1 me-2 text-sm font-normal text-gray-100 bg-gray-600 rounded-full"
                        >
                          {fileName}
                          <button
                            type="button"
                            onClick={()=>{handleFileRemove()}}
                            className="inline-flex justify-center items-center w-4 h-4 ms-2 text-sm text-white bg-[#FF7CA1] rounded-full hover:bg-[#c55a78]"
                            data-dismiss-target="#badge-dismiss-default"
                            aria-label="Remove"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </span>
                      </div>
                      <label
                        htmlFor="imageFile"
                        className="xl:px-10 sm:px-5 px-4 absolute inset-y-0 top-2 bottom-2 right-2 flex items-center rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 mr-2 fill-white inline"
                          viewBox="0 0 32 32"
                        >
                          <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                          <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                        </svg>
                        Upload
                        <input
                          type="file"
                          id="imageFile"
                          name="imageFile"
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                 

                  {/* Enter Prompt Section */}
                  <div>
                    <label className="block mb-2 sm:text-lg text-gray-400">
                      Enter Prompt
                    </label>
                    <textarea
                      className="block w-full rounded-xl border-0 ring-1 ring-inset ring-[#EE4172] ring-opacity-40 py-5 px-4 text-lg text-white bg-transparent placeholder:text-gray-500 font-light focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-purple-600 sm:leading-6 duration-150"
                      placeholder="Enter Prompt"
                      type="text"
                      id="prompt"
                      name="prompt"
                      value={prompt}
                      onChange={handlePromptChange}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                
                  <div>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full block xl:px-10 sm:px-6 px-4 sm:py-5 py-2.5 text-lg rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
                    >
                      {loading ? "Processing..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {originalImage && (
          <section className="lg:py-12 py-5 text-white relative">
            <div className="xl:container mx-auto px-4 relative">
              <div className="max-w-[988px] mt-10 mx-auto">
                <h3 className="mb-5 text-[22px] font-medium text-white text-center">
                  Image Result
                </h3>
                <div className="p-8 rounded-3xl border border-gray-500 bg-[#1E1E1E] flex flex-col gap-y-6">
                  <div className="flex flex-wrap -mx-4 gap-y-6">
                    {/* Original Image */}

                    <div className="lg:w-6/12 md:w-6/12 w-full px-4">
                      <h4 className="mb-3 text-lg text-[#959595] text-center">
                        Original Image
                      </h4>
                      <div className="rounded-2xl overflow-hidden">
                        <img
                          src={originalImage}
                          alt="Original Image"
                          width="1176"
                          height="787"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Edited Image */}
                    {remixedImage && (
                      <div className="lg:w-6/12 md:w-6/12 w-full px-4">
                        <h4 className="mb-3 text-lg text-[#959595] text-center">
                          Edited Image
                        </h4>
                        <div className="rounded-2xl overflow-hidden">
                          <img
                            src={remixedImage}
                            alt="Edited Image"
                            width="1176"
                            height="787"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Download Button */}
                  {remixedImage && (
                    <button
                      onClick={() => handleDownload(remixedImage)}
                      className="w-full block xl:px-10 sm:px-6 px-4 sm:py-5 py-2.5 text-lg rounded-full bg-gradient-to-r from-[#4283EF] to-[#EE4172] hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="pt-10 pb-8 relative text-white">
        <div className="relative">
          <div className="xl:container mx-auto px-4 relative">
            <div className="flex flex-wrap items-center justify-center max-md:text-center -mx-4 md:gap-y-10 gap-y-5 ">
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

export default RemixImage;
