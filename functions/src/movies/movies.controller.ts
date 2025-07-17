// src/movies/movies.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { IMDbService } from '../IMDb/imdb.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly imdbService: IMDbService) {}

  /**
   * Get the most popular TV shows.
   * Example: GET /movies/most-popular-tv?limit=10&offset=0
   */
  @Get('most-popular-tv')
  getMostPopularTV(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination(
      '/api/imdb/most-popular-tv',
      query,
    );
  }

  /**
   * Get the top 250 rated TV shows.
   * Example: GET /movies/top250-tv?limit=10&offset=0
   */
  @Get('top250-tv')
  getTop250TV(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination('/api/imdb/top250-tv', query);
  }

  /**
   * Get the most popular movies.
   * Example: GET /movies/most-popular-movie?limit=10&offset=0
   */
  @Get('most-popular-movie')
  getMostPopularMovie(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination(
      '/api/imdb/most-popular-movies',
      query,
    );
  }

  /**
   * Get the top 250 rated movies.
   * Example: GET /movies/top250-movie?limit=10&offset=0
   */
  @Get('top250-movie')
  getTop250Movie(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination(
      '/api/imdb/top250-movies',
      query,
    );
  }

  /**
   * Get upcoming movie releases by country and type.
   * Example: GET /movies/upcoming-releases?countryCode=US&type=MOVIE
   */
  @Get('upcoming-releases')
  getUpcomingReleases(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination(
      '/api/imdb/upcoming-releases',
      query,
    );
  }

  /**
   * Get a list of available movie genres.
   * Example: GET /movies/genres
   */
  @Get('genres')
  getGenres(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination('/api/imdb/genres', query);
  }

  /**
   * Get a list of countries with available content.
   * Example: GET /movies/countries
   */
  @Get('countries')
  getLanguages(@Query() query: Record<string, string>) {
    return this.imdbService.proxyWithPagination('/api/imdb/countries', query);
  }

  /**
   * Search movies, TV shows, or people by keyword.
   * Example: GET /movies/?type=movie&genre=Drama&rows=10&sortOrder=ASC&sortField=id
   */
  @Get('search')
  search(@Query() query: Record<string, string | number>) {
    return this.imdbService.proxyWithPagination('/api/imdb/search', query);
  }

  /**
   * Get details for a specific title by ID.
   * Example: GET /movies/title/tt1234567
   */
  @Get('title/:id')
  getTitle(@Param('id') id: string) {
    return this.imdbService.proxy(`/api/imdb/${id}`);
  }
}
