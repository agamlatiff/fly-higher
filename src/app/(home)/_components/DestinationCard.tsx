import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  image: string;
  location: string;
  country: string;
  price: string;
}

const DestinationCard = ({
  image,
  location,
  country,
  price,
}: DestinationCardProps) => {
  return (
    <Link
      href="/available-flights"
      className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <Image
        src={image}
        alt={location}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-white/80 text-sm font-semibold mb-1">From {price}</p>
        <h4 className="text-white text-2xl font-bold">
          {location}, {country}
        </h4>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
    </Link>
  );
};

export default DestinationCard;
