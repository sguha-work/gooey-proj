import React, { useState } from "react";
import Frame from "../components/images/Frame.svg";

export default function Drag() {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0]; // Only handle the first file for simplicity
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 10, 100);
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const dragAreaStyle = {
    marginTop: "1.5rem",
    padding: "1.5rem",
    border: `2px solid ${dragging ? "blue" : "black"}`,
    borderRadius: "0.5rem",
    borderColor: dragging ? "blue" : "gray",
    borderStyle: dragging ? "solid" : "dashed",
  };

  return (
    <section className="py-20 relative">
      <div class="absolute top-0 left-0 right-0">
        <div class="w-screen overflow-hidden">
          <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 left-[4vw]"></div>
          <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[20vw] right-2/4"></div>
          <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[-10vw] right-1/4"></div>
          <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 right-0"></div>
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1070px] mx-auto text-center">
          <div className="max-w-[730px] mx-auto text-center">
            <h3 className="lg:text-[45px] text-3xl leading-tight font-semibold">
              AI Photo Enhancer:
              <br />
              Upscale your photo quality for free
            </h3>
          </div>
          <br />
          <p className="text-lg text-gray-700">
            Fix dark, blurry, and oversaturated photos with our free online
            image enhancer. Instantly improve image quality using AI for easy
            download or sharing on social media apps.
          </p>
        </div>

        <div className="max-w-[1192px] mx-auto mt-10">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center p-10 w-full rounded-lg cursor-pointer bg-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.1)]"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              // style={dragAreaStyle}
            >
              <div className="w-full p-10 rounded-xl border-4 border-gray-300 border-dashed text-center">
                {selectedFile && (
                  <div className="mb-5 max-w-48 mx-auto flex justify-center items-center">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded"
                      className="max-w-full"
                    />
                  </div>
                )}
                {!selectedFile && (
                  <div className="mb-5 max-w-48 mx-auto flex justify-center items-center">
                    <img src={Frame} alt="Frame" className="max-w-full" />
                  </div>
                )}
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">
                    {selectedFile
                      ? "Your Selected File"
                      : "Drag and drop an image or Browse"}
                  </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  File must be JPEG, JPG, or PNG and up to 40MB
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex justify-center">
                  <button
                    className="mt-4 bg-black text-white rounded px-4 py-2"
                    onClick={handleUpload}
                  >
                    Upload Image
                  </button>
                </div>
                {uploadProgress > 0 && (
                  <div className="mt-4 w-full">
                    <div className="bg-gray-200 h-4 rounded-md overflow-hidden">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
