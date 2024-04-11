import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.component.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    comment:
      "“I am super happy with Al Enhance I spend a lot of time on my photos, quality is so important to me! I'm not always so lucky, so I choose to do what I can to fix them. The results have often felt like miracles after using Al Enhance. Incredibly nice & natural!”",
  },
  {
    id: 2,
    name: "Jane Doe",
    comment:
      "“I am super happy with Al Enhance I spend a lot of time on my photos, quality is so important to me! I'm not always so lucky, so I choose to do what I can to fix them. The results have often felt like miracles after using Al Enhance. Incredibly nice & natural!”",
  },
  {
    id: 3,
    name: "Alice Smith",
    comment:
      "“I am super happy with Al Enhance I spend a lot of time on my photos, quality is so important to me! I'm not always so lucky, so I choose to do what I can to fix them. The results have often felt like miracles after using Al Enhance. Incredibly nice & natural!”",
  },
];

export default function Review() {
  const testimonials = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="pb-10 lg:pt-0 pt-20">
      <div className="max-w-[1640px] mx-auto px-5">
        <div className="flex flex-wrap -mx-8 items-center">
          <div className="lg:w-4/12 md:w-4/12 w-full px-8">
            <h3 className="mb-5 lg:text-[45px] text-3xl leading-tight font-bold">What people are saying about us</h3>
            <p>Make your pics high resolution - HD, 4k and beyond. Enlarge and sharpen photos for printing and web in a single click.</p>
          </div>
          <div className="lg:w-7/12 md:w-7/12 w-full ml-auto px-8">
            <Slider {...testimonials}>
              {reviews.map((review) => (
                <div key={review.id} className="lg:py-20 px-5">
                  <div className="bg-white p-10 text-center rounded-lg shadow-[0px_100px_60px_-50px_rgba(19,15,48,0.1)]">
                    <p className="mb-5 text-lg leading-relaxed text-gray-500">{review.comment}</p>
                    <h4 className="text-lg font-bold">{review.name}</h4>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
