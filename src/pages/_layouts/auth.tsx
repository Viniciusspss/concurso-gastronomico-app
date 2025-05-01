import { Outlet } from "react-router-dom"

export function AuthLayout() {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center bg-[#F2F2F2]">
            <Outlet />
        </div>
    )
}