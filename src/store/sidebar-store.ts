import { create } from "zustand";

import { NAV_GROUPS } from "@/lib/navigation/config";
import { applySidebarSectionsCollapse } from "@/lib/navigation/sidebar-section-document";
import { storageKeys } from "@/lib/storage/keys";
import { readLocalJSON, writeLocalJSON } from "@/lib/storage/local-storage";

interface SidebarState {
  isCollapsed: boolean;
  collapsedSections: Record<string, boolean>;
  toggleSidebar: () => void;
  toggleSection: (key: string) => void;
  expandSection: (key: string) => void;
  isSectionCollapsed: (key: string) => boolean;
  initFromStorage: () => void;
}

function defaultCollapsedSections(): Record<string, boolean> {
  return Object.fromEntries(NAV_GROUPS.map((group) => [group.key, false]));
}

function readCollapsedSections(): Record<string, boolean> {
  const defaults = defaultCollapsedSections();
  const stored = readLocalJSON<Record<string, boolean>>(storageKeys.sidebarSections);
  if (!stored) {
    return defaults;
  }
  return { ...defaults, ...stored };
}

function persistCollapsedSections(collapsedSections: Record<string, boolean>) {
  writeLocalJSON(storageKeys.sidebarSections, collapsedSections);
  applySidebarSectionsCollapse(collapsedSections);
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isCollapsed: false,
  collapsedSections: defaultCollapsedSections(),

  toggleSidebar: () => {
    set((state) => {
      const isCollapsed = !state.isCollapsed;
      writeLocalJSON(storageKeys.sidebarCollapsed, isCollapsed);
      return { isCollapsed };
    });
  },

  toggleSection: (key) => {
    set((state) => {
      const collapsedSections = {
        ...state.collapsedSections,
        [key]: !state.collapsedSections[key],
      };
      persistCollapsedSections(collapsedSections);
      return { collapsedSections };
    });
  },

  expandSection: (key) => {
    if (!get().collapsedSections[key]) {
      return;
    }
    set((state) => {
      const collapsedSections = { ...state.collapsedSections, [key]: false };
      persistCollapsedSections(collapsedSections);
      return { collapsedSections };
    });
  },

  isSectionCollapsed: (key) => get().collapsedSections[key] ?? false,

  initFromStorage: () => {
    const isCollapsed = readLocalJSON(storageKeys.sidebarCollapsed, false);
    const collapsedSections = readCollapsedSections();
    applySidebarSectionsCollapse(collapsedSections);
    set({ isCollapsed, collapsedSections });
  },
}));
