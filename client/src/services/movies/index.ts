// src/services/movies/index.ts
import api from "../../lib/api";

export const moviesService = {
  /**
   * Fetch a list of the most popular movies
   * @param limit Number of items to fetch
   * @param offset Number of items to skip
   */
  fetchPopularMovies: async (limit = 10, offset = 0) => {
    try {
      const { data } = await api.get("/movies/most-popular-movie", {
        params: { limit, offset },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      throw error;
    }
  },

  /**
   * Fetch a list of the most popular TV shows
   * @param limit Number of items to fetch
   * @param offset Number of items to skip
   */
  fetchPopularTVShow: async (limit = 10, offset = 0) => {
    try {
      const { data } = await api.get("/movies/most-popular-tv", {
        params: { limit, offset },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch popular TV shows:", error);
      throw error;
    }
  },

  /**
   * Fetch upcoming releases filtered by country and type
   * @param limit Number of items to fetch
   * @param offset Number of items to skip
   * @param countryCode Country ISO code (e.g., "US")
   * @param type Type of content ("MOVIE" or "TV")
   */
  fetchUpcomingReleases: async (
    limit = 10,
    offset = 0,
    countryCode = "US",
    type = "MOVIE"
  ) => {
    try {
      const { data } = await api.get("/movies/upcoming-releases", {
        params: { limit, offset, countryCode, type },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch upcoming releases:", error);
      throw error;
    }
  },

  /**
   * Fetch available movie/TV genres
   * @param limit Number of genres to fetch
   * @param offset Number of genres to skip
   */
  fetchGenres: async (limit = 28, offset = 0) => {
    try {
      const { data } = await api.get("/movies/genres", {
        params: { limit, offset },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      throw error;
    }
  },

  /**
   * Fetch detailed information for a specific movie/TV title
   * @param id IMDb ID (e.g., "tt0816692")
   */
  fetchDetail: async (id: string) => {
    try {
      const response = await api.get(`/movies/title/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch detail:", error);
      throw error;
    }
  },

  /**
   * Search for movies, TV shows, or people by query.
   * @param queryParams Object with search parameters (e.g., type, genre, rows, sortOrder)
   */
  search: async (queryParams: Record<string, string | number>) => {
    try {
      const response = await api.get("/movies/search", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to search movies:", error);
      throw error;
    }
  },
};
