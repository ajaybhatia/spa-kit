import { storageKeys } from "@/lib/storage/keys";

const SECTIONS_STYLE_ID = "app-sidebar-sections-bootstrap";

export function collapseSectionsCss(collapsedSections: Record<string, boolean>): string {
  let css = "";
  for (const [key, collapsed] of Object.entries(collapsedSections)) {
    if (!collapsed) {
      continue;
    }
    css += `[data-nav-section-items="${key}"]{display:none!important}`;
    css += `[data-nav-section-chevron-expanded="${key}"]{display:none!important}`;
    css += `[data-nav-section-chevron-collapsed="${key}"]{display:block!important}`;
  }
  return css;
}

/** Apply collapsed section visibility before React paints (inline script + store updates). */
export function applySidebarSectionsCollapse(collapsedSections: Record<string, boolean>): void {
  if (typeof document === "undefined") {
    return;
  }

  const css = collapseSectionsCss(collapsedSections);
  const existing = document.getElementById(SECTIONS_STYLE_ID) as HTMLStyleElement | null;

  if (!css) {
    existing?.remove();
    return;
  }

  const style = existing ?? document.createElement("style");
  style.id = SECTIONS_STYLE_ID;
  style.textContent = css;
  if (!existing) {
    document.head.appendChild(style);
  }
}

/**
 * Inline script injected before React so collapsed sections match storage on first paint.
 * Mirrors theme FOUC prevention in lib/theme/theme.ts.
 */
export const sidebarSectionsInitScript = `(function(){try{var k=${JSON.stringify(storageKeys.sidebarSections)};var r=localStorage.getItem(k);if(!r)return;var m=JSON.parse(r);var css="";for(var key in m){if(!m[key])continue;css+="[data-nav-section-items=\\""+key+"\\"]{display:none!important}";css+="[data-nav-section-chevron-expanded=\\""+key+"\\"]{display:none!important}";css+="[data-nav-section-chevron-collapsed=\\""+key+"\\"]{display:block!important}";}if(!css)return;var s=document.createElement("style");s.id=${JSON.stringify(SECTIONS_STYLE_ID)};s.textContent=css;document.head.appendChild(s);}catch(e){}})();`;
