import { Outlet } from "react-router-dom";
import { AppHeader } from "@/features/header";

// компонент outlet - это место, где будут отображаться компоненты, которые мы будем добавлять в роутер
export function App() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
