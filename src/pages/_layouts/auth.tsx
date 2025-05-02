import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="w-[500px] px-4">
        <Outlet />
      </div>
    </div>
  );
}
