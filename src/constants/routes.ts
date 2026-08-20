/** Application route paths — single source of truth for router and nav config. */
export const ROUTES = {
  home: "/",
  settings: "/settings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
