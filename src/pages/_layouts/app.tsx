import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex h-screen  w-full flex-col items-center ">
      <Outlet />

    </div>
  );
}
