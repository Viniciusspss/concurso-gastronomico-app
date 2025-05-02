import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-[#1E1E1E]">
      <div className="flex w-[80%] flex-col items-center justify-center px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
