import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { Login } from "./pages/auth/user/Login";
import { SelectProfile } from "./pages/auth/SelectProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/", element: <SelectProfile />
            },
            {
                path: "/Login", element: <Login />
            }
        ]

    }
])