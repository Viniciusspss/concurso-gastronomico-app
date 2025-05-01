import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div className="w-full h-screen flex flex-col bg-[#1E1E1E] items-center">
            <div className="w-[80%] px-4 py-8">
                <Outlet />
            </div>
        </div>
    )
}