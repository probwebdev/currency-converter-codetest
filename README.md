# Currency converter codetest

## Important! Set your app_id in apps/oxr/.env:
`APP_ID=<your_id>`

Codetest to implement currency converter.  
Project is implemented as a monorepo with reusable configurations and packages.  
**Stack**: Next.js, tRPC, Turborepo, CSS Modules and Tailwind.

## How to use

At the root level `package.json` most common scripts could be found:

- `pnpm dev` to run a dev server
- `pnpm build` to build a project before starting a prod server
- `pnpm start` run a production build



## Notes:
- Due to time constraints persisted state not finished due SSR nature of implementation. It is fixable but did't have enough time to finish implementation of `usePersistedSettings` hook
- Due to api free plan constraints there are some unreliable conversion in-place which requires more work and bug fixing. Preferrably is to use `base` property and render data from server instead of rely on USD base.
- For home assignments I use my personal boilerplate monorepo
- Due to time constraints app not stable enough and not finished but rather made as a proof of concept without proper styling and fine tuning of the ui/ux
- ideally dayjs should be put into reusable package
- Unfortunately can't mention all of the issues due to time constraints and it is more about further conversation