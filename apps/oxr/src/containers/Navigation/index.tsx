import Link from 'next/link';

export const Navigation = () => {
  return (
    <div className="button-links flex w-full flex-row flex-nowrap justify-between gap-4 text-black">
      <div className="flex flex-row flex-nowrap gap-2">
        <Link href="/">
          Home
        </Link>
        <Link href="/converter">
          Converter
        </Link>
        <Link href="/history">
          History
        </Link>
      </div>
    </div>
  );
};
