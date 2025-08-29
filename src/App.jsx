import { Children } from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Mainlayouts from "./layouts/Mainlayouts";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";

import { action as RegisterAction } from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { login } from "./app/features/userSlice";

function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <Mainlayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     dispatch(login(user));
  //   });
  // }, []);

  return <RouterProvider router={routes} />;
}

export default App;
