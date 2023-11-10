import { type PropsWithChildren } from 'react';

import { Navigation } from '~/containers/Navigation';

export const LayoutContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="m-auto flex min-w-card flex-col items-center gap-4 rounded-xl border-2 border-neutral-200 bg-white p-8 drop-shadow">
        {children}
      </div>
      <Navigation />
    </>
  );
};
