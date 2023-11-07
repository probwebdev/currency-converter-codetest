import { trpc } from '~/utils/trpc';

const IndexPage = () => {
  const { data, error } = trpc.oxr.latest.useQuery();

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
