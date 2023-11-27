import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_IMG = "https://image.tmdb.org/t/p/w500";
const NULL_IMG =
  "https://i.pinimg.com/236x/ef/20/6f/ef206fbf6e7b9357eace54ff1f10a0ab.jpg";
const NULL_IMG2 =
  "https://i.pinimg.com/236x/e1/fa/6e/e1fa6e8a8d0b5545db092d84583aeb0e.jpg";
const NULL_IMG3 =
  "https://i.pinimg.com/564x/13/5e/49/135e49ff85a3c8b49d721ba1b2d45ea3.jpg";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center content-center w-full h-full">
        <p className="m-1 p-72 text-2xl text-red-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* <div className="pt-20">
        <div className="px-5">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div className="flex">
            <img
              src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3}
              alt={`poster for ${movie.title}`}
              className="w-[350px] h-full"
            />
            <img
              src={
                movie.backdrop_path ? API_IMG + movie.backdrop_path : NULL_IMG2
              }
              alt={`poster for ${movie.title}`}
              className="h-full w-full"
            />
          </div>
          {console.log(movie)}
        </div>
      </div> */}
      <div className="px-5 pt-32 text-white flex items-center ">
        <div className="pr-5">
          <img
            src={movie.poster_path ? API_IMG + movie.poster_path : NULL_IMG3}
            alt=""
          />
        </div>
        <div className="flow-root ">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium">Title</dt>
              <dd className="t   sm:col-span-2">{movie.title}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium">Salary</dt>

              <dd className="t   sm:col-span-2 flex">
                {movie.genres.map((genre) => (
                  <h4 key={genre.id}>{genre.name + ","}</h4>
                ))}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium">Release</dt>
              <dd className="t   sm:col-span-2">{movie.release_date}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium">Budget</dt>
              <dd className="t   sm:col-span-2">{movie.budget + "$"}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium">Overview</dt>
              <dd className="t   sm:col-span-2">{movie.overview}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
