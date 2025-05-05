import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layouts/auth";
import { SignIn as SignInUser } from "../pages/auth/user/Sign-in";
import { SignUp as SignUpUser } from "../pages/auth/user/Sign-up";
import { SignIn as SignInRestaurant } from "../pages/auth/restaurant/Sign-in";
import { SignUp as SignUpRestaurant } from "../pages/auth/restaurant/Sign-up";
import { SelectProfile } from "../pages/auth/SelectProfile";
import { AppLayout } from "@/pages/_layouts/app";
import { Dishes } from "@/pages/app/dishes/Dishes";
import { Profile } from "@/pages/app/profile/Profile";
import { EditProfile } from "@/pages/app/profile/EditProfile";
import { NotFound } from "@/pages/NotFound";
import { PrivateRoute } from "@/components/PrivateRoute";
import { EvaluateDish } from "@/pages/app/dishes/EvaluateDish";
import { About } from "@/pages/app/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <SelectProfile />,
      },
      {
        path: "SignIn",
        children: [
          { path: "User", element: <SignInUser /> },
          { path: "Restaurant", element: <SignInRestaurant /> },
        ],
      },
      {
        path: "SignUp",
        children: [
          { path: "User", element: <SignUpUser /> },
          { path: "Restaurant", element: <SignUpRestaurant /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/Dishes",
        element: (
          <PrivateRoute type="client">
            <Dishes />,
          </PrivateRoute>
        ),
      },
      {
        path: "/Profile",
        element: (
          <PrivateRoute type="client">
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/EditProfile",
        element: (
          <PrivateRoute type="client">
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/evaluate-dish",
        element: (
          <PrivateRoute type="client">
            <EvaluateDish />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
