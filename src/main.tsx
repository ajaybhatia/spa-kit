import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import { AppProviders } from "@/components/providers/app-providers";
import { sidebarSectionsInitScript } from "@/lib/navigation/sidebar-section-document";
import { themeInitScript } from "@/lib/theme/theme";

import "@/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

function injectBootstrapScript(script: string) {
  const el = document.createElement("script");
  el.textContent = script;
  document.head.appendChild(el);
}

injectBootstrapScript(themeInitScript);
injectBootstrapScript(sidebarSectionsInitScript);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProviders>
          <App />
        </AppProviders>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
