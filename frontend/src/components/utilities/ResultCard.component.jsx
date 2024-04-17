import { useState } from "react";
import new1 from "../images/new1.avif";

export default function ResultCard() {
  const [resultImage, setResultImage] = useState(""); // State to store the URL of the result image

  // Function to handle download of the result image
  const handleDownload = () => {
    // Check if the result image URL is available
    if (resultImage) {
      // Create an anchor element
      const anchor = document.createElement("a");
      // Set the href attribute to the result image URL
      anchor.href = resultImage;
      // Set the download attribute to specify the filename for the downloaded image
      anchor.download = "result_image.jpg";
      // Append the anchor element to the document body
      document.body.appendChild(anchor);
      // Programmatically click the anchor element to initiate the download
      anchor.click();
      // Remove the anchor element from the document body
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
              {/* Use resultImage state to display the result image */}
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
            
              <button
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
</button>


              <p className="text-sm">Full image 612*915</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-pink-500 text-pink-500  font-bold py-2 px-4 rounded flex items-center"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V3zm10 5a1 1 0 00-1 1v6l-2.293-2.293a1 1 0 00-1.414 0L7 15l-1.293-1.293a1 1 0 00-1.414 0L3 15V8a1 1 0 00-1-1H1a1 1 0 00-1 1v9a1 1 0 001 1h14a1 1 0 001-1V9a1 1 0 00-1-1h-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
