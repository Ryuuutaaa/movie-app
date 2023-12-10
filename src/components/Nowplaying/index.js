import { useRouter } from "next/router";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { FreeMode, Pagination } from "swiper/modules";

const Nowplaying = ({ genres, nowplayingMovies }) => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        loop={true}
        className="mySwiper"
      >
        <section>
          {nowplayingMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div>
                <Link
                  href={`/movie/${movie.id}`}
                  className="group block h-64 sm:h-80 lg:h-96"
                >
                  <div className="relative flex h-full transform items-end border-2 border-black bg-black transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                    <div className="w-full h-full transition-opacity group-hover:absolute group-hover:opacity-30">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={`Poster for ${movie.title}`}
                      />
                    </div>

                    <div className="absolute opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 text-white">
                      <h3 className="mt-4 text-xl font-medium sm:text-2xl text-purple-800">
                        {movie.title}
                      </h3>

                      {/* Tambahkan genre ke dalam elemen <p> */}
                      <div className="text-sm flex justify-center">
                        {movie.genre_ids.map((genreId) => {
                          const genre = genres.find((g) => g.id === genreId);
                          return genre ? (
                            <p key={genre.id} className="text-center mx-1">
                              {genre.name}
                            </p>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </section>
      </Swiper>
    </>
  );
};

export default Nowplaying;
