import { useMemo } from 'react';

import { trpc } from '~/utils/trpc';

export const useCurrenciesList = () => {
  const { data = {}, isLoading } = trpc.oxr.currencies.useQuery();

  const currencies = useMemo(() => new Map(Object.entries(data)), [data]);

  return { currencies, isLoading };
};
