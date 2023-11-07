import axios from 'axios';
import dayjs from 'dayjs';
import { z } from 'zod';

import { publicProcedure, createTRPCRouter } from '../trpc';

import type { RatesData, CurrenciesData } from './oxr.types';

export const API_URL = 'https://openexchangerates.org/api';

export const OXR_API_URLS = {
  latest: () => `${API_URL}/latest.json`,
  currencies: () => `${API_URL}/currencies.json`,
  historical: (date: string) => `${API_URL}/historical/${date}.json`,
  ohlc: () => `${API_URL}/ohlc.json`,
} as const;

const APP_ID = {
  app_id: process.env.APP_ID ?? '',
};

const sharedInputParams = z.object({
  symbols: z.string(),
  base: z.string().optional(),
  prettyprint: z.boolean().optional(),
  show_alternative: z.boolean().optional(),
});

export const oxrRouter = createTRPCRouter({
  latest: publicProcedure.input(sharedInputParams).query(async ({ input }) => {
    const { data } = await axios.get<RatesData>(OXR_API_URLS.latest(), {
      params: {
        ...APP_ID,
        ...input,
      },
    });

    return data;
  }),
  currencies: publicProcedure
    .input(
      z.optional(
        z.object({
          prettyprint: z.boolean().optional(),
          show_alternative: z.boolean().optional(),
          show_inactive: z.boolean().optional(),
        })
      )
    )
    .query(async ({ input }) => {
      const { data } = await axios.get<CurrenciesData>(
        OXR_API_URLS.currencies(),
        {
          params: {
            ...APP_ID,
            ...input,
          },
        }
      );

      return data;
    }),
  historical: publicProcedure
    .input(
      z
        .object({
          date: z.string().datetime(),
        })
        .merge(sharedInputParams)
    )
    .query(async ({ input }) => {
      const { date: datetime, ...params } = input;

      const date = dayjs(datetime).format('YYYY-MM-DD');

      const { data } = await axios.get<RatesData>(
        OXR_API_URLS.historical(date),
        {
          params: {
            ...APP_ID,
            ...params,
          },
        }
      );
      return data;
    }),
  historicalCompare: publicProcedure
    .input(
      z
        .object({
          dates: z.string().datetime().array().max(2),
        })
        .merge(sharedInputParams)
    )
    .query(async ({ input }) => {
      const { dates, ...params } = input;

      const rates: RatesData[] = await Promise.all(
        dates.map(async (date) => {
          const datetime = dayjs(date).format('YYYY-MM-DD');

          const { data } = await axios.get<RatesData>(
            OXR_API_URLS.historical(datetime),
            {
              params: {
                ...APP_ID,
                ...params,
              },
            }
          );
          return data;
        })
      );

      return rates;
    }),
  // Premium feature but implemented anyway to test zod enum
  ohlc: publicProcedure
    .input(
      z
        .object({
          start_time: z.string().datetime(),
          period: z.enum([
            '1m',
            '5m',
            '15m',
            '30m',
            '1h',
            '12h',
            '1d',
            '1w',
            '1mo',
          ]),
        })
        .merge(sharedInputParams)
    )
    .query(async ({ input }) => {
      const { data } = await axios.get<unknown>(OXR_API_URLS.ohlc(), {
        params: {
          ...APP_ID,
          ...input,
        },
      });

      return data;
    }),
});
