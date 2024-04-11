import { useState } from "react";
import Frame from "../components/images/Frame.svg";
import { SERVER_URL } from "../constants/common.constant";
export default function Drag() {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [outputImageUrl, setOutputImageUrl] = useState(null);
  const [processing, setProcessing] = useState(false);

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
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Immediately upload the file
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${SERVER_URL}/image/upload`, {
      method: "POST",
      body: formData,
      // Update progress bar
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadProgress(progress);
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Upload successful");
          return response.json();
        } else {
          console.error("Upload failed");
          throw new Error("Upload failed");
        }
      })
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error occurred while uploading:", error);
      });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Set upload progress to 0 initially
    setUploadProgress(0);
    setProcessing(true);

    fetch("http://localhost:4000/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_image:
          "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg",
        text_prompt: "make the picture black and white",
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Image processing successful");
          return response.json();
        } else {
          console.error("Image processing failed");
          throw new Error("Image processing failed");
        }
      })
      .then((result) => {
        console.log("Processing result:", result);

        const outputImageUrl = result.data.output.output_images[0];
        setOutputImageUrl(outputImageUrl);
        console.log("Output image URL:", outputImageUrl);

        setUploadProgress(null);
      })
      .catch((error) => {
        console.error("Error processing image:", error);
      })
      .finally(() => {
        setProcessing(false);
      });
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
      <div className="absolute top-0 left-0 right-0">
        <div className="w-screen overflow-hidden">
          <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 left-[4vw]"></div>
          <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[20vw] right-2/4"></div>
          <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[-10vw] right-1/4"></div>
          <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 right-0"></div>
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
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center p-10 w-full rounded-lg cursor-pointer bg-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.1)]"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              // style={dragAreaStyle}
            >
              <div className="w-full p-10 rounded-xl border-4 border-gray-300 border-dashed text-center">
                {!selectedFile && (
                  <div className="mb-5 max-w-48 mx-auto flex justify-center items-center">
                    <img src={Frame} alt="Frame" className="max-w-full" />
                  </div>
                )}

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {selectedFile ? "" : "Drag and drop an image or Browse"}
                  </span>
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex ">
                  <div className="w-6/12">
                    {selectedFile && (
                      <div className="mb-5 max-w-48 mx-auto flex justify-center items-center">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Uploaded"
                          className="max-w-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-6/12">
                    {outputImageUrl && (
                      <div className="flex justify-center mt-4">
                        <img
                          src={outputImageUrl}
                          alt="Output"
                          className="max-w-[300px]"
                          placeholder="Result"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  File must be JPEG, JPG, or PNG and up to 40MB
                </p>
                <div className="flex justify-center">
                  <button
                    className="mt-4 bg-black text-white rounded px-4 py-2"
                    onClick={handleUpload}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Upload Image"}
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
