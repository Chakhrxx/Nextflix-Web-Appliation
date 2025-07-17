// src/IMDb/imdb.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class IMDbService {
  private readonly apiUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: ConfigService) {
    this.apiUrl = config.get<string>(
      'RAPIDAPI_BASE_URL',
      'https://imdb236.p.rapidapi.com',
    );
    this.headers = {
      'x-rapidapi-host': config.get<string>(
        'RAPIDAPI_HOST',
        'imdb236.p.rapidapi.com',
      ),
      'x-rapidapi-key': config.get<string>(
        'RAPIDAPI_KEY',
        'cbf5866b79msh5a2c063ac0824c2p1b6ad3jsnfe34d2eb6f36',
      ),
    };
  }

  async proxy(
    path: string,
    query: Record<string, string | number> = {},
  ): Promise<any> {
    const url = `${this.apiUrl}${path}`;
    const res = await axios.get(url, {
      headers: this.headers,
      params: query,
    });
    return res.data;
  }

  async proxyWithPagination(
    path: string,
    query: Record<string, string | number> = {},
  ): Promise<{
    total: number;
    offset: number;
    limit: number;
    data: any[];
  }> {
    const { limit = 10, offset = 0, ...params } = query;
    const url = `${this.apiUrl}${path}`;

    const res = await axios.get(url, {
      headers: this.headers,
      params,
    });

    const raw: any = res.data;

    let list: any[] = [];

    if (Array.isArray(raw)) {
      list = raw;
    } else if (Array.isArray(raw.results)) {
      list = raw.results;
    } else if (Array.isArray(raw.titles)) {
      list = raw.titles;
    } else if (Array.isArray(raw.data?.results)) {
      list = raw.data.results;
    } else if (Array.isArray(raw.data?.titles)) {
      list = raw.data.titles;
    } else if (typeof raw === 'object') {
      // Handle object where values are objects with `titles` array
      const values = Object.values(raw);
      const extracted = values.flatMap((v: any) =>
        Array.isArray(v?.titles) ? v.titles : [],
      );
      list = extracted;
    }

    const start = Number(offset);
    const end = start + Number(limit);

    return {
      total: list.length,
      offset: start,
      limit: Number(limit),
      data: list.slice(start, end),
    };
  }
}
