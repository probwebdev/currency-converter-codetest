import Link from 'next/link';

export const Navigation = () => {
  return (
    <div className="button-links flex min-w-card flex-row flex-nowrap justify-stretch gap-4 rounded-xl border-2 border-neutral-200 bg-white p-4 text-black text-center drop-shadow">
      <Link className="flex-auto" href="/">Home</Link>
      <Link className="flex-auto" href="/converter">Converter</Link>
      <Link className="flex-auto" href="/history">History</Link>
    </div>
  );
};
