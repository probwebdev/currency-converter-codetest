import axios from 'axios';
import { z } from 'zod';

import { publicProcedure, createTRPCRouter } from '../trpc';

import type { LatestRatesData } from './oxr.types';

export const API_URL = 'https://openexchangerates.org/api';

export const OXR_API_URLS = {
  latest: () => `${API_URL}/latest.json`,
} as const;

const APP_ID = {
  app_id: process.env.APP_ID ?? '',
};

export const oxrRouter = createTRPCRouter({
  latest: publicProcedure
    .input(
      z.optional(
        z.object({
          base: z.string().optional(),
          symbols: z.string().optional(),
          prettyprint: z.boolean().optional(),
          show_alternative: z.boolean().optional(),
        })
      )
    )
    .query(async ({ input }) => {
      const { data } = await axios.get<LatestRatesData>(
        OXR_API_URLS.latest(),
        {
          params: {
            ...APP_ID,
            ...input,
          },
        }
      );

      return data;
    }),
});
