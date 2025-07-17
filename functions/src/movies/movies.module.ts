// src/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';
import { IMDbService } from '../IMDb/imdb.service';

@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [IMDbService],
})
export class MoviesModule {}
