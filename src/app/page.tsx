"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { moviesService } from "@/services/movies";
import { Movie } from "@/types/movies";

export default function Home() {
  const [shows, setShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const highlightedIds = [
    "tt31806049",
    "tt14205554",
    "tt14961624",
    "tt10919420",
    "tt1751634",
    "tt30406366",
    "tt31216548",
    "tt27995114",
  ];

  useEffect(() => {
    moviesService
      .fetchPopularTVShow(11, 0)
      .then((res) => setShows(res.data || []))
      .catch((err) => console.error("Error fetching show:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || shows.length === 0) {
    return <p className="text-white p-8">Loading...</p>;
  }

  const featured = shows[0];
  const others = shows.slice(1, 11);

  return (
    <>
      <Navbar />

      {/* Desktop View */}
      <main
        className="hidden md:block min-h-screen bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url('/MainShowBG.png')` }}
      >
        <div className="px-8 pb-16 pt-32 flex flex-col justify-between h-screen">
          <div className="flex flex-col justify-end">
            <div className="relative h-8 w-24">
              <Image
                src="/NSeriesOriginals.png"
                alt="NSeriesOriginals"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div className="relative w-[30%] h-36 mt-2">
              <Image
                src="/ShowLogo.png"
                alt="ShowLogo"
                fill
                sizes="480px"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col w-[30%] gap-4 mt-5">
              <h1 className="font-semibold flex gap-2 items-center">
                <span className="relative w-5 h-5">
                  <Image
                    src="/Top10.png"
                    alt="Top 10"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </span>
                <span>#1 in TV Shows Today</span>
              </h1>
              <p>{featured.description || "No description available."}</p>
              <div className="flex gap-2">
                <button className="bg-white h-8 px-4 text-black font-semibold text-sm">
                  ▶ Play
                </button>
                <button className="flex bg-[#515451] px-8 h-8 gap-2 items-center text-sm">
                  <span className="flex justify-center items-center border rounded-full w-5 h-5">
                    ℹ
                  </span>
                  <span className="font-semibold">Info</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold px-1">Popular on Netflix</h2>
            <Swiper spaceBetween={12} className="w-full px-4">
              {others.map((movie, i) => (
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
                          width={12}
                          height={12}
                        />
                      </div>
                    )}
                    <Image
                      src={movie.primaryImage || "/NoImageAvailable.png"}
                      alt={`poster-${i}`}
                      fill
                      sizes="144px"
                      className="object-fill"
                    />
                    {highlightedIds.includes(movie.id) && (
                      <Image
                        src="/NewSeason.png"
                        alt="New Season"
                        height={50}
                        width={80}
                        className="absolute bottom-2 left-0 z-50"
                      />
                    )}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>

      {/* Mobile View */}
      <div className="block md:hidden w-full">
        <div className="relative w-full h-[60vh]">
          <Image
            src={"/MainShowMobileBG.png"}
            alt="Mobile Background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
          <div className="absolute inset-0 z-20 flex items-end justify-center p-4">
            <div className="flex flex-col justify-end">
              <div className="relative w-[257px] h-[30px]">
                <Image
                  src="/NSeriesOriginals.png"
                  alt="NSeriesOriginals"
                  fill
                  sizes="257px"
                  className="object-contain"
                />
              </div>
              <div className="relative w-[300px] h-[178px] -my-10">
                <Image
                  src="/ShowLogo.png"
                  alt="ShowLogo"
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>

              <h1 className="text-center font-semibold">
                TV Mysteries ● Based on Books
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-black text-white px-6 py-10">
          <div className="-mt-10 pt-4 pb-6 flex flex-col w-full gap-4">
            <div className="flex justify-between items-center text-sm w-[90%] mx-auto">
              <button className="flex flex-col items-center font-semibold">
                <span className="text-[30px]">＋</span>
                <span>My List</span>
              </button>
              <button className="bg-white h-10 px-8 text-black rounded font-semibold">
                ▶ Play
              </button>
              <button className="flex flex-col items-center font-semibold">
                <span className="flex justify-center items-center border-2 rounded-full w-8 h-8 text-lg">
                  ℹ
                </span>
                <span>Info</span>
              </button>
            </div>

            <h2 className="text-lg font-semibold px-1">Popular on Netflix</h2>
            <Swiper spaceBetween={12} className="w-full px-4">
              {others.map((movie, i) => (
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
                      src={movie.primaryImage || "/NoImageAvailable.png"}
                      alt={`poster-${i}`}
                      fill
                      sizes="112px"
                      className="object-fill object-center"
                    />
                    {highlightedIds.includes(movie.id) && (
                      <Image
                        src="/NewSeason.png"
                        alt="New Season"
                        height={50}
                        width={80}
                        className="absolute bottom-2 left-0 z-50"
                      />
                    )}
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
