"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { moviesService } from "@/services/movies";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";

import { Movie } from "@/types/movies";
import Link from "next/link";

export default function Home() {
  const [show, setShow] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const highlightedIds = [
    "tt10919420",
    "tt1751634",
    "tt30406366",
    "tt31216548",
    "tt27995114",
  ];

  useEffect(() => {
    moviesService
      .fetchPopularTVShow(11, 0)
      .then((res) => {
        setShow(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching show:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || show.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="loader"></div>
      </div>
    );
  return (
    <>
      <Navbar />

      {/* Desktop */}
      <main
        className="hidden md:block min-h-screen bg-cover bg-top bg-no-repeat text-white"
        style={{
          backgroundImage: `url('${
            show[0].primaryImage ?? "/NoImageAvailable.png"
          }')`,
        }}
      >
        <div className="px-8 pb-16 pt-20 flex flex-col justify-between h-screen">
          <div className="flex flex-col justify-end ">
            <div className="relative h-8 w-24">
              <Image
                src="/NSeriesOriginals.png"
                alt="NSeriesOriginals"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <h1 className="font-bold text-[60px] uppercase text-shadow-xs w-[30%] leading-16">
              {show[0].primaryTitle}
            </h1>

            <div className="flex flex-col w-[30%] gap-4 mt-5">
              <h1 className="font-semibold flex gap-2 items-center">
                <span className="relative w-5 h-5">
                  <Image
                    src="/Top10.png"
                    alt="Mobile Background"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </span>
                <span className="text-shadow-xs">#1 in TV Shows Today</span>
              </h1>
              <p className="text-shadow-xs">{show[0].description}</p>
              <div className="flex gap-2">
                <button className="bg-white h-8 px-4 text-black  font-semibold text-[18px]">
                  ▶ Play
                </button>
                <button className="flex bg-[#515451] px-8 h-8 gap-2 items-center text-[18px]">
                  <span className="text-[16px] flex justify-center items-center border rounded-full px-2 pb-[2px]  w-5 h-5">
                    ℹ
                  </span>
                  <span className="text-[14px] font-semibold">Info</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold px-1">Popular on Netflix</h1>
            <Swiper className="w-full px-4" spaceBetween={12}>
              {show.slice(1, 11).map((movie, i) => (
                <SwiperSlide
                  key={i}
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

      {/* Mobile */}
      <div className="block md:hidden w-full">
        {/* Top image 60vh */}
        <div className="relative w-full h-[60vh]">
          <Image
            src={show[0].primaryImage ?? "/NoImageAvailable.png"}
            alt="Mobile Background"
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent z-10" />
        </div>

        {/* Bottom content */}
        <div className="bg-black text-white px-6 py-10">
          <div className="-mt-10 pt-4 pb-6 flex flex-col text-white w-full gap-4">
            <div className="flex justify-between items-center text-[14px] w-[90%] mx-auto md:hidden">
              <button className="flex flex-col leading-6 items-center font-semibold">
                <span className="text-[30px]">＋</span>
                <span>My List</span>
              </button>
              <button className="bg-white h-10 px-8 text-black rounded font-semibold">
                ▶ Play
              </button>
              <button className="flex flex-col leading-6 items-center font-semibold">
                <span className="text-[24px] flex justify-center items-center border-2 rounded-full px-2 pb-1 w-8 h-8">
                  ℹ
                </span>
                <span>Info</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold px-1">Popular on Netflix</h1>
              <Swiper spaceBetween={12} className="w-full px-4">
                {show.map((movie, i) => (
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
      </div>
    </>
  );
}
