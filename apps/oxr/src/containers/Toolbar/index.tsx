import type { PropsWithChildren } from 'react';

import { AddCurrenciesButton } from '~/components/AddCurrenciesButton';

export const Toolbar = ({ children }: PropsWithChildren) => (
  <div className="flex w-full flex-row items-center justify-end gap-4">
    {children}
    <AddCurrenciesButton />
  </div>
);
