const cardDimension = { card: '35rem' };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/!(*.d).{js,jsx,ts,tsx}',
    './src/**/!(*.d).{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      minWidth: { ...cardDimension },
      maxWidth: {
        ...cardDimension,
        content: '60rem',
      },
      minHeight: {
        ...cardDimension,
      },
      height: { ...cardDimension },
      width: { ...cardDimension },
      screens: {
        sm: '40em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        xxl: '90em',
        xxxl: '160em',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
