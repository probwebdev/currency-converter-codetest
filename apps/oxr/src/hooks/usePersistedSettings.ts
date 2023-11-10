import createPersistedState from '@plq/use-persisted-state';
import storage from '@plq/use-persisted-state/lib/storages/local-storage';

import { useCurrenciesList } from '~/hooks/useCurrenciesList';

const [usePersistedState, clear] = createPersistedState('settings', storage);

export interface PersistedSettings {
  amount: number;
  selectedCurrencies: string[];
}

const initialSettings: PersistedSettings = {
  amount: 1,
  selectedCurrencies: ['USD', 'GBP', 'EUR', 'SEK'],
};

export const usePersistedSettings = () => {
  const [settings, setSettings] = usePersistedState<PersistedSettings>(
    'currencies-settings',
    initialSettings
  );
  const { currencies } = useCurrenciesList();

  return {
    settings,
    currencies,
    updateAmount: (amount: number) => {
      void setSettings((prevState) => ({ ...prevState, amount }));
    },
    updateCurrencies: (selectedCurrencies: string[]) => {
      void setSettings((prevState) => ({ ...prevState, selectedCurrencies }));
    },
    clear,
  };
};
