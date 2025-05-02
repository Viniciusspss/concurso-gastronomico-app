import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layouts/auth";
import { SignIn as SignInUser } from "../pages/auth/user/Sign-in";
import { SignUp as SignUpUser } from "../pages/auth/user/Sign-up";
import { SignIn as SignInRestaurant } from "../pages/auth/restaurant/Sign-in";
import { SignUp as SignUpRestaurant } from "../pages/auth/restaurant/Sign-up";
import { SelectProfile } from "../pages/auth/SelectProfile";
import { AppLayout } from "@/pages/_layouts/app";
import { Dishs } from "@/pages/app/dishs/Dishs";
import { Profile } from "@/pages/app/profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/", element: <SelectProfile />
            },
            {
                path: "SignIn", children: [
                    { path: "User", element: <SignInUser /> },
                    { path: "Restaurant", element: <SignInRestaurant /> }
                ]
            },
            {
                path: "SignUp", children: [
                    { path: "User", element: <SignUpUser /> },
                    { path: "Restaurant", element: <SignUpRestaurant /> }
                ]
            },
        ],

    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/Dishs", element: <Dishs />
            },
            {
                path: "/Profile", element: <Profile />
            }
        ]
    }
])