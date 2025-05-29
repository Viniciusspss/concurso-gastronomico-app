import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-[var(--color-background)]">
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
