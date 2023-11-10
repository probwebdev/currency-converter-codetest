import 'react-day-picker/dist/style.css';
import '~/css/core.css';

import { trpc } from '~/utils/trpc';

import { LayoutContainer } from '~/containers/LayoutContainer';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className="flex min-h-screen w-screen flex-col items-center justify-stretch gap-4 overflow-y-auto px-2 py-8 sm:px-8">
    <LayoutContainer>
      <Component {...pageProps} />
    </LayoutContainer>
  </main>
);

export default trpc.withTRPC(MyApp);
