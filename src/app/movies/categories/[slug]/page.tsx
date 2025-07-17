"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { moviesService } from "@/services/movies";
import { Movie } from "@/types/movies";
import Link from "next/link";
import "swiper/css";

const formatSlugToCapital = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export default function CategoriesPage() {
  const { slug } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const highlightedIds = ["tt31806049", "tt14205554", "tt14961624"];
  const formattedGenre = formatSlugToCapital(String(slug));

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    moviesService
      .search({
        type: "movie",
        genre: formattedGenre,
        rows: 11,
        sortOrder: "ASC",
        sortField: "id",
      })
      .then((res) => setMovies(res.data || []))
      .catch((err) => console.error("Error fetching movies:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading || !movies.length)
    return (
      <>
        <Navbar />
        <div className="text-white text-center py-20">Loading...</div>
      </>
    );

  const featured = movies[0];
  const rest = movies.slice(1, 11);

  return (
    <>
      <Navbar />

      {/* Desktop */}
      <main
        className="hidden md:block min-h-screen bg-cover bg-top bg-no-repeat text-white"
        style={{
          backgroundImage: `url('${
            featured.primaryImage ?? "/NoImageAvailable.png"
          }')`,
        }}
      >
        <div className="px-8 pb-16 pt-32 flex flex-col justify-between h-screen">
          <div className="flex flex-col justify-end">
            <h1 className="font-bold text-[80px] uppercase text-shadow-xs">
              {featured.primaryTitle}
            </h1>
            <div className="flex flex-col w-[30%] gap-4">
              <div className="font-semibold flex gap-2 items-center">
                <span className="relative w-5 h-5">
                  <Image
                    src="/Top10.png"
                    alt="Top 10"
                    fill
                    className="object-contain"
                    priority
                  />
                </span>
                <span className="text-shadow-xs">#1 in Movies Today</span>
              </div>
              <p className="text-shadow-xs">{featured.description}</p>
              <div className="flex gap-2">
                <button className="bg-white h-8 px-4 text-black font-semibold text-[18px]">
                  ▶ Play
                </button>
                <button className="flex bg-[#515451] px-8 h-8 gap-2 items-center text-[18px]">
                  <span className="text-[16px] border rounded-full w-5 h-5 flex justify-center items-center">
                    ℹ
                  </span>
                  <span className="text-[14px] font-semibold">Info</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold px-1 text-shadow-xs">
              Popular on Netflix
            </h2>
            <Swiper className="w-full px-4" spaceBetween={12}>
              {rest.map((movie, i) => (
                <SwiperSlide
                  key={movie.id}
                  className="relative !w-36 !h-48 rounded hover:scale-110"
                >
                  <Link
                    href={`/movies/${movie.id}`}
                    className="block w-full h-full relative"
                  >
                    {highlightedIds.includes(movie.id) && (
                      <div className="absolute top-2 left-3 z-10">
                        <Image
                          src="/NetflixIcon.png"
                          alt="Netflix Icon"
                          width={10}
                          height={10}
                        />
                      </div>
                    )}
                    <Image
                      src={movie.primaryImage ?? "/NoImageAvailable.png"}
                      alt={`poster-${i}`}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      {/* Mobile */}
      <div className="block md:hidden w-full">
        <div className="relative w-full h-[60vh]">
          <Image
            src={featured.primaryImage ?? "/NoImageAvailable.png"}
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent z-10" />
        </div>

        <div className="bg-black text-white px-6 py-10">
          <div className="-mt-10 pt-4 pb-6 flex flex-col w-full gap-4">
            <div className="flex justify-between items-center text-[14px] w-[90%] mx-auto">
              <button className="flex flex-col items-center font-semibold">
                <span className="text-[30px]">＋</span>
                <span>My List</span>
              </button>
              <button className="bg-white h-10 px-8 text-black rounded font-semibold">
                ▶ Play
              </button>
              <button className="flex flex-col items-center font-semibold">
                <span className="text-[24px] border-2 rounded-full w-8 h-8 flex justify-center items-center">
                  ℹ
                </span>
                <span>Info</span>
              </button>
            </div>

            <h2 className="text-lg font-semibold px-1">Popular on Netflix</h2>
            <Swiper className="w-full px-4" spaceBetween={12}>
              {rest.map((movie, i) => (
                <SwiperSlide
                  key={movie.id}
                  className="relative !w-28 !h-36 rounded hover:scale-110"
                >
                  <Link
                    href={`/movies/${movie.id}`}
                    className="block w-full h-full relative"
                  >
                    {highlightedIds.includes(movie.id) && (
                      <div className="absolute top-2 left-3 z-10">
                        <Image
                          src="/NetflixIcon.png"
                          alt="Netflix Icon"
                          width={10}
                          height={10}
                        />
                      </div>
                    )}
                    <Image
                      src={movie.primaryImage ?? "/NoImageAvailable.png"}
                      alt={`poster-${i}`}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
