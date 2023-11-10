import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useCurrenciesList } from '~/hooks/useCurrenciesList';
import { useState } from 'react';

export const AddCurrenciesButton = () => {
  const { currencies } = useCurrenciesList();

  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label="Add currency" asChild>
        <button>Add currency</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="max-h-96 overflow-y-auto rounded border-2 border-neutral-600 bg-white p-2 shadow-2xl"
        >
          {Array.from(currencies.entries()).map(([key, value]) => (
            <DropdownMenu.CheckboxItem
              key={key}
              className="flex flex-row gap-2"
              checked={selectedCurrencies.includes(key)}
              onCheckedChange={(checked) => {
                if (!checked) {
                  setSelectedCurrencies((prevState) =>
                    prevState.filter((item) => item !== key)
                  );
                  return;
                }

                setSelectedCurrencies((prevState) => [...prevState, key]);
              }}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                +
              </DropdownMenu.ItemIndicator>
              {`${key} - ${value}`}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
