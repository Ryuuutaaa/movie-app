import { Inter } from "next/font/google";
import Category from "@/components/Category";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/swiper-bundle.css";
import Popular from "@/components/Popular";
import Upcoming from "@/components/Upcoming";
import Toprated from "@/components/Toprated";
import Nowplaying from "@/components/Nowplaying";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [nowplayingMovies, setNowplayingMovies] = useState([]);
  const [query, setQuery] = useState("");

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
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        // Pastikan struktur respons sesuai dengan yang diharapkan
        const upcomingMoviesData = data.results || []; // Ganti dengan properti yang benar jika perlu
        setUpcomingMovies(upcomingMoviesData);
      })
      .catch((error) =>
        console.error("Error fetching upcoming movies:", error)
      );
  }, []);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        // Pastikan struktur respons sesuai dengan yang diharapkan
        const topratedMoviesData = data.results || []; // Ganti dengan properti yang benar jika perlu
        setTopratedMovies(topratedMoviesData);
      })
      .catch((error) =>
        console.error("Error fetching toprated movies:", error)
      );
  }, []);

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        // Pastikan struktur respons sesuai dengan yang diharapkan
        const nowplayingMoviesData = data.results || []; // Ganti dengan properti yang benar jika perlu
        setNowplayingMovies(nowplayingMoviesData);
      })
      .catch((error) =>
        console.error("Error fetching nowplaying movies:", error)
      );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <Landing movies={movies} />
      <div className="my-20">
        <h3 className="text-2xl font-bold">Popular</h3>
        <Popular
          movies={movies}
          genres={genres}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>

      <div className="my-20">
        <h3 className="text-2xl font-bold">Upcoming</h3>
        <Upcoming genres={genres} upcomingMovies={upcomingMovies} />
      </div>

      <div className="my-20">
        <h3 className="text-2xl font-bold">Top Rated</h3>
        <Toprated genres={genres} topratedMovies={topratedMovies} />
      </div>

      <div className="my-20">
        <h3 className="text-2xl font-bold">Now Playing</h3>
        <Nowplaying genres={genres} nowplayingMovies={nowplayingMovies} />
      </div>

      <Category />
    </>
  );
};

export default Home;
