import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const AnotherCollection = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Movie Collection
          </h2>

          <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="my-3">
              <Link href={`/MovieDetail/${movie.id}`}>
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
