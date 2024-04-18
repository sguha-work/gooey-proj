import { useEffect, useState } from "react";
import ReactCompareImage from "react-compare-image";
import { Subject_ImageUploaded$, Subject_RetroStyleToImage$, Subject_ImageConvertedToRetro$ } from "../../subjects/image.behavior-subject";
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';
import { SERVER_URL } from "../../constants/common.constant";
import Modal from "./modal.component";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
const Upscale = () => {
  const dummyImage1 = "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg";
  const dummyImage2 = "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/fda030fa-f8fc-11ee-9505-02420a00015d/gooey.ai%20-%20colorful%20background%20studio%20ghibli%20ponyo%20anime%20excited%20anime%20saturated%20colors%20color..png";
  const [leftAndRightImageURL, setLeftAndRightImageURL] = useState({
    image1: dummyImage1,
    image2: dummyImage2
  });
  useEffect(() => {
    let image = {}
    Subject_ImageUploaded$.asObservable().subscribe((uploadedImageData) => {
      uploadedImageData && (async () => {
        const mediaSource = uploadedImageData.mediaSource;
        image.image1 = mediaSource;
        Subject_RetroStyleToImage$.next(mediaSource);
      })();
    });
    Subject_RetroStyleToImage$.asObservable().subscribe((imageURL) => {
      imageURL && (() => {
        Subject_ShowModal$.next(true);
        const ajaxObservable = ajax({
          url: `${SERVER_URL}/image`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            "input_image": imageURL,
            "manualEnhancement":
              [
                {
                  "type": "color"
                }
              ]
          }

        }).pipe(
          map(response => response.response),
          catchError(error => of(error))
        );

        ajaxObservable.subscribe({
          next: value => Subject_ImageConvertedToRetro$.next(value),
          error: err => console.log(err)
        });
      })();
    });
    Subject_ImageConvertedToRetro$.asObservable().subscribe((retroImageData) => {
      retroImageData && (() => {
        console.log({ retroImageData });
        const image2 = retroImageData.data.output.output_images[0];
        image = {
          ...image,
          image2
        };
        setLeftAndRightImageURL({ ...image });
        Subject_ShowModal$.next(false);
      })()
    });
  }, []);
  return (
    <>
      <Modal show={true}></Modal>
      <section className="sm:pt-10 pb-20">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap items-center md:-mx-4 gap-y-8">
            <div className="lg:w-5/12 md:w-6/12 w-full md:px-4">
              <h3 className="mb-5 lg:text-[45px] text-3xl leading-tight font-bold max-w-[658px]">
                Upscale pictures
                
                without losing quality up to 16x
              </h3>
              <p className="text-lg text-gray-700 max-w-[480px]">
                Make your pics high resolution - HD, 4k and beyond. Enlarge and
                sharpen photos for printing and web in a single click.
              </p>
            </div>
            <div className="lg:w-6/12 md:w-6/12 w-full md:px-4 lg:ms-auto relative">
              <div className="rounded-2xl border-4 border-solid border-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.25)] overflow-hidden">
                <div className="p-2 flex -mx-2 absolute z-[1] top:0 left-4 right-4">
                    <div className="px-2 w-6/12 text-center">
                        <label className="block mb-2 text-xl font-medium">Original</label>
                    </div>
                    <div className="px-2 w-6/12 text-center">
                        <label className="block mb-2 text-xl font-medium">Result</label>
                    </div>
                </div>
                <ReactCompareImage leftImage={leftAndRightImageURL.image1} rightImage={leftAndRightImageURL.image2} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Upscale;
