/** Prefix for all localStorage keys — avoids collisions on shared origins. Rename via AGENTS.md. */
export const STORAGE_PREFIX = "app";

export const storageKeys = {
  sidebarCollapsed: `${STORAGE_PREFIX}-sidebar-collapsed`,
  sidebarSections: `${STORAGE_PREFIX}-sidebar-sections`,
  theme: `${STORAGE_PREFIX}-theme`,
} as const;

/**
 * Build a stable key for feature-local UI chrome.
 * Example: `uiStateKey("orders", "workspace")` → `app-ui-orders-workspace`
 */
export function uiStateKey(scope: string, name: string): string {
  return `${STORAGE_PREFIX}-ui-${scope}-${name}`;
}
