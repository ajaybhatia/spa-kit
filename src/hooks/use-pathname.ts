import { useLocation } from "react-router-dom";

/** Pathname helper wrapping `useLocation()`. */
export function usePathname(): string {
  return useLocation().pathname;
}
