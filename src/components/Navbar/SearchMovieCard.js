const { default: Link } = require("next/link");

const SearchMovieCard = ({ movie }) => {
  const { id, title, backdrop_path } = movie;
  const imageURL = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "/placeholder-image.jpg";
  return (
    <>
      <Link href={`/movie/${id}`}>
        <div className="relative block overflow-hidden group aspect-w-2 aspect-h-3 hover:opacity-80 transition-opacity duration-300">
          <div className="absolute inset-0 bg-cover bg-center group-hover:bg-black group-hover:bg-opacity-80 transition-all duration-300">
            {backdrop_path && (
              <img
                src={imageURL}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute inset-0 flex items-end justify-start p-4 group-hover:opacity-100">
            <h3 className="text-white text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchMovieCard;
