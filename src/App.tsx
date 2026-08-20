import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ROUTES } from "@/constants/routes";
import { HomeScreen } from "@/screens/home/home-screen";
import { SettingsScreen } from "@/screens/settings/settings-screen";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardShell />}>
        <Route index element={<HomeScreen />} />
        <Route path={ROUTES.settings.slice(1)} element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}
