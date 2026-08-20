import { create } from "zustand";

interface NavigationTransitionState {
  isNavigating: boolean;
  startNavigation: () => void;
  completeNavigation: () => void;
}

export const useNavigationTransitionStore = create<NavigationTransitionState>((set) => ({
  isNavigating: false,
  startNavigation: () => set({ isNavigating: true }),
  completeNavigation: () => set({ isNavigating: false }),
}));
