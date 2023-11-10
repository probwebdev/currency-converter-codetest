import { useState } from 'react';

import * as Label from '@radix-ui/react-label';

import { Toolbar } from '~/containers/Toolbar';
import { useCurrenciesList } from '~/hooks/useCurrenciesList';
import { trpc } from '~/utils/trpc';

const BASE = 'USD';

const ConverterPage = () => {
  const [amount, setAmount] = useState(1);
  const [selectedCurrencies] = useState([
    'USD',
    'GBP',
    'EUR',
    'SEK',
  ]);
  const { currencies } = useCurrenciesList();
  const { data, error } = trpc.oxr.latest.useQuery({
    symbols: selectedCurrencies.join(','),
    base: BASE,
  });

  const rates = new Map(Object.entries(data?.rates ?? {}));

  if (error?.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="m-auto flex min-w-card flex-col items-center gap-4 rounded-xl border-2 border-neutral-200 bg-white p-8 drop-shadow">
      <Toolbar />
      <ul className="flex w-full list-none flex-col gap-4 p-0">
        {selectedCurrencies.map((currency) => {
          const rate = rates.get(currency) ?? 0;

          return (
            <li key={currency}>
              <div className="flex flex-row flex-nowrap items-end justify-between gap-4">
                <Label.Root
                  className="flex flex-col"
                  htmlFor={`${currency}-value`}
                >
                  <span className="font-medium">
                    {currencies.get(currency)}
                  </span>
                  <span className="text-neutral-500">{currency}</span>
                </Label.Root>
                <input
                  className="text-right"
                  id={`${currency}-value`}
                  min={1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    const conversionAmount = value > 0 ? value : 1;

                    if (currency === BASE) {
                      setAmount(conversionAmount);
                    } else {
                      setAmount(conversionAmount / rate);
                    }
                  }}
                  value={Math.round(amount * rate * 100) / 100}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConverterPage;
