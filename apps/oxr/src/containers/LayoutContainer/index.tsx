import { type PropsWithChildren } from 'react';

export const LayoutContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-screen max-w-sm flex-auto flex-col items-center justify-between gap-8 text-center md:max-w-content">
      {children}
    </div>
  );
};
