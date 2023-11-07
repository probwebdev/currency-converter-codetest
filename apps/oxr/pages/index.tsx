import { trpc } from '~/utils/trpc';

const IndexPage = () => {
  const { data, error } = trpc.oxr.latest.useQuery({
    symbols: 'USD,GBP,EUR',
  });

  if (error?.message) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return <>{data?.base}</>;
};

export default IndexPage;
