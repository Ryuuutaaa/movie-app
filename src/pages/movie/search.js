import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PageSearch = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (q) {
      // Lakukan panggilan API pencarian berdasarkan `q`
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    }
  }, [q]);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  return (
    <>
      <div>
        <Landing movies={movies} />
        <Navbar />
      </div>
      <div className="p-2">
        <div className="grid grid-cols-5 gap-4 mt-8">
          {searchResults.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              className="group relative block bg-black"
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
              />

              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-purple-800 font-bold">
                      {movie.title}
                    </p>
                    <div className="flex">
                      {movie.genre_ids.map((genreId) => {
                        const genre = genres.find((g) => g.id === genreId);
                        return genre ? (
                          <p key={genre.id} className="text-sm text-white ">
                            {genre.name}
                          </p>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PageSearch;
