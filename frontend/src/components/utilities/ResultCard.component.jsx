import { useState } from "react";
import new1 from "../images/new1.avif";

export default function ResultCard() {
  const [resultImage, setResultImage] = useState(""); 

 
  const handleDownload = () => {
   
    if (resultImage) {
    
      const anchor = document.createElement("a");
      
      anchor.href = resultImage;
    
      anchor.download = "result_image.jpg";
    
      document.body.appendChild(anchor);
      
      anchor.click();
     
      document.body.removeChild(anchor);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1192px] mx-auto mt-10 border-2 border-gray-300 rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <label className="mb-2">Original</label>
              <img src={new1} alt="new1" className="mb-2" />
            </div>
            <div className="flex flex-col items-center ml-8">
              <label className="mb-2">Result</label>
             
              <img src={resultImage || new1} alt="result" className="mb-2" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-end border border-gray-300 rounded p-4 ml-4">
            
              <button
                onClick={handleDownload}
                className="bg-pink-600 hover:bg-pink-700 text-white flex font-bold py-2 px-4 rounded mb-2"
              >
                Free Download
                <svg
    className="h-5 w-5 ml-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
              </button>
              <p className="text-sm mb-2">Preview image 612*915</p>
            
              {/* <button
  onClick={handleDownload}
  className="border border-pink-500 text-pink-500 hover:text-white hover:bg-pink-500 hover:border-pink-500 font-bold py-2 px-4 rounded flex items-center"
>
  Download HD
  <svg
    className="h-5 w-5 ml-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
</button> */}


              <p className="text-sm">Full image 612*915</p>
              <div className="relative flex flex-col items-center">
  <textarea
    placeholder="Write Your Prompt..."
    className="border border-pink-500 text-pink-500 font-bold py-2 px-4 rounded resize-none h-24 w-full max-w-md"
  ></textarea>
  <br />
  <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded text-center">
    Submit
  </button>
</div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
