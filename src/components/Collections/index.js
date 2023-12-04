import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const AnotherCollection = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const page = 8;
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 8)));
  }, []);

  const openOverview = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <section id="popular">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-start">
          <h2 className="text-xl font-bold text-white  sm:text-3xl">
            Movie Collection
          </h2>
        </header>

        <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3">
              <Link href={`/movie/${movie.id}`}>
                <div className="block overflow-hidden group" passHref>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Poster for ${movie.title}`}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[450px]"
                  />
                </div>
              </Link>
              <h2 className="text-center font-semibold mt-3">{movie.title}</h2>
              <h3 className="text-center font-semibold mt-3">
                {movie.vote_average}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AnotherCollection;
