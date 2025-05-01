import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignIn } from "./pages/auth/user/Sign-in";
import { SelectProfile } from "./pages/auth/SelectProfile";
import { SingUp } from "./pages/auth/user/Sign-up";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/", element: <SelectProfile />
            },
            {
                path: "/SignIn", element: <SignIn />
            },
            {
                path: "/SignUp", element: <SingUp />
            }
        ]

    }
])