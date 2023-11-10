import { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import { ChooseDatesPopover } from '~/components/ChooseDatesPopover';
import { Toolbar } from '~/containers/Toolbar';
import { useCurrenciesList } from '~/hooks/useCurrenciesList';
import { trpc } from '~/utils/trpc';

const BASE = 'USD';

const HistoryPage = () => {
  const [amount] = useState(1);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    'USD',
    'GBP',
    'EUR',
    'SEK',
  ]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { currencies } = useCurrenciesList();

  const dates = selectedDates.map((date) => dayjs(date).toISOString());
  const symbols = selectedCurrencies.join(',');

  const { data, error } = trpc.oxr.historicalCompare.useQuery(
    {
      dates,
      symbols,
      base: BASE,
    },
    { enabled: selectedDates.length === 2 }
  );

  const historicalRates = (data ?? []).map(
    (history) => new Map(Object.entries(history.rates))
  );

  useEffect(() => {
    const date = dayjs();
    const today = date.toDate();
    const yesterday = date.subtract(1, 'day').toDate();
    setSelectedDates([yesterday, today]);
  }, []);

  if (error?.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <Toolbar>
        <div className="mr-auto">
          <ChooseDatesPopover
            className="mr-auto"
            mode="multiple"
            label="Choose Dates"
            toDate={new Date()}
            fromDate={dayjs('1999-01-01').toDate()}
            selected={selectedDates}
            onSelect={(values) => {
              const dates = values ?? [];

              if (dates.length < 3) {
                setSelectedDates(
                  dates.sort((a, b) => a.getTime() - b.getTime())
                );
              }
            }}
          />
        </div>
      </Toolbar>
      <div className="flex w-full flex-row items-center justify-end">
        <span>
          {selectedDates
            .map((date) => dayjs(date).format('YYYY-MM-DD'))
            .join(' / ')}
        </span>
      </div>
      <ul className="flex w-full list-none flex-col gap-4 p-0">
        {selectedCurrencies
          .filter((item) => item !== BASE)
          .map((currency) => (
            <li key={currency}>
              <div className="flex flex-row flex-nowrap items-end justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {currencies.get(currency)}
                  </span>
                  <span className="text-neutral-500">{currency}</span>
                </div>
                <div className="flex flex-row gap-4 text-right">
                  {historicalRates.map((rates, index) => {
                    const rate = rates.get(currency) ?? 0;

                    return (
                      <span key={index} className="text-right">
                        {Math.round(amount * rate * 100) / 100}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HistoryPage;
