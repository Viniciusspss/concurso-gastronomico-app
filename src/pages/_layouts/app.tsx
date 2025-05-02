import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div className="w-full h-screen flex flex-col bg-[#1E1E1E] items-center">
            <div className="flex flex-col w-[80%] px-4 py-8 items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}