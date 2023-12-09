import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      const { results } = response.data;
      setMovies(results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2 text-black"
      />
      <Link>
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </Link>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
