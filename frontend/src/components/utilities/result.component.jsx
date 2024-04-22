import { useRef, useState } from "react";
import "./result-card.component.css";
import direction from "../images/direction.png";
import { SERVER_URL } from "../../constants/common.constant";
import PropType from "prop-types";
import Button from "./button.component";
import { TbChevronDown } from "react-icons/tb";
import { toast } from "react-toastify";

export default function Result({ originalImage }) {
  const [resultImage, setResultImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadRef = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await fetch(`${SERVER_URL}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_image: originalImage.mediaSource,
        text_prompt: promptText,
      }),
    });
    setIsLoading(false);

    if (!response.ok) {
      toast("Failed to generate image, please try again.");
      return;
    }

    const data = await response.json();

    if (data?.data?.detail?.error) {
      toast.error(data.data.detail.error);
      return;
    }

    setResultImage(data.data?.output?.output_images?.[0]);
  };

  return (
    <>
      <section className="lg:pb-20 pb-10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-[1192px] mx-auto lg:mt-10">
            <div className="flex flex-wrap -mx-2">
              <div className="lg:w-9/12 sm:w-8/12 w-full flex items-center px-2 relative">
                <div className="flex -mx-2">
                  <div className="px-2 text-center">
                    <label className="block mb-2 text-xl font-medium">
                      Original
                    </label>
                    <img
                      src={originalImage?.mediaSource}
                      alt="new1"
                      className="mb-2 image h-auto rounded-lg"
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
                    <img
                      src={direction}
                      alt="direction"
                      className="w-2/4 mx-auto"
                    />
                  </div>
                  <div className="px-2 text-center">
                    <label className="block mb-2 text-xl font-medium">
                      Result
                    </label>
                    <img
                      src={resultImage ?? originalImage?.mediaSource}
                      alt="result"
                      className="mb-2 image h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-3/12 sm:w-4/12 w-full flex items-center px-2">
                <div className="w-full text-center">
                  <a
                    ref={downloadRef}
                    style={{ display: "none" }}
                    href="/"
                    target="_blank"
                    download
                  ></a>
                  <Button
                    type="button"
                    disabled={!resultImage}
                    loading={isDownloading}
                    onClick={async () => {
                      setIsDownloading(true);
                      const response = await fetch(resultImage);
                      const blob = await response.blob();
                      const downloadUrl = window.URL.createObjectURL(blob);
                      downloadRef.current.href = downloadUrl;
                      downloadRef.current.download =
                        "result." + resultImage.split(".").pop();
                      downloadRef.current.click();
                      setIsDownloading(false);
                    }}
                    className="w-full mb-2 bg-pink-600 hover:opacity-80"
                  >
                    Free Download
                    <TbChevronDown className="ml-2" size={20} />
                  </Button>

                  <div className="relative flex flex-col items-center gap-y-4">
                    <textarea
                      placeholder="Welcome to Atlaschat please write your prompt here."
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full lg:h-36 sm:h-32 h-24 py-2 px-4 text-base text-gray-700 border border-slate-200 rounded resize-none"
                    ></textarea>
                    <Button
                      disabled={!promptText}
                      loading={isLoading}
                      onClick={handleSubmit}
                      className="bg-black hover:opacity-80 w-full"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Result.propTypes = {
  originalImage: PropType.object,
};
