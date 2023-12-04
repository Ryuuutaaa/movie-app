import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const Upcoming = () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const page = 2;
  const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`;
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 6)));
  }, []);
  return (
    <div className="py-8">
      <div>
        <h4>Upcoming</h4>
        <ul className="grid gap-4 mt-8">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3">
              <Link href={`/movie/${movie.id}`}>
                <div
                  className=" overflow-hidden group flex items-center"
                  passHref
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`Poster for ${movie.title}`}
                    className="w-[80px] object-cover transition duration-500 group-hover:scale-110 "
                  />
                  <h2 className="font-semibold px-3">{movie.title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Upcoming;
