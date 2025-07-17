import { notFound } from "next/navigation";
import Image from "next/image";
import { moviesService } from "../../../services/movies";
import { Movie } from "../../../types/movies";
import Navbar from "../../../components/Navbar";

export const dynamic = "force-dynamic";

// Fetch movie detail using service
async function fetchMovie(slug: string): Promise<Movie | null> {
  try {
    const data = await moviesService.fetchDetail(slug);
    return data;
  } catch {
    return null;
  }
}

// Helper: convert YouTube watch URL to embed URL
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url || !url.includes("youtube.com/watch?v=")) return null;
  const videoId = url.split("v=")[1]?.split("&")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const movie = await fetchMovie(slug);

  if (!movie) return notFound();

  const trailerUrl = getYouTubeEmbedUrl(movie.trailer);

  return (
    <>
      <Navbar />
      <main className="px-6 py-20 text-white bg-black min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[400px] mb-6">
            <Image
              src={movie.primaryImage ?? "/NoImageAvailable.png"}
              alt={movie.primaryTitle}
              sizes="100vw"
              fill
              className="object-contain rounded"
            />
          </div>

          <h1 className="text-3xl font-bold">{movie.primaryTitle}</h1>

          <p className="text-gray-300 mt-2">{movie.description}</p>
          {/* YouTube Trailer */}
          {trailerUrl && (
            <div className="mt-8 aspect-video">
              <iframe
                src={trailerUrl}
                title="Trailer"
                className="w-full h-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>Genres:</strong> {movie.genres?.join(", ") || "-"}
            </p>
            <p>
              <strong>Rating:</strong> {movie.averageRating ?? "-"}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
