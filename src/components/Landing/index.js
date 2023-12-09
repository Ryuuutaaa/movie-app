import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const Landing = ({ movies }) => {
  if (!movies) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-black h-screen">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
      </div>
    );
  }
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper relative mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        style={{ maxWidth: "100vw" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id} className="relative mx-auto">
            <div
              className="h-screen w-screen bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                width: "100vw",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-24">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
                <p className="text-lg font-semibold text-white mt-2">
                  {movie.overview}
                </p>
                <Link href={`/movie/${movie.id}`}>
                  <p className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    More
                  </p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Landing;
