import '~/css/core.css';

import { trpc } from '~/utils/trpc';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main className="flex flex-col min-h-screen w-screen items-center justify-stretch overflow-y-auto px-2 py-8 sm:px-8">
    <Component {...pageProps} />
  </main>
);

export default trpc.withTRPC(MyApp);
