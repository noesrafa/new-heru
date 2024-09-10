import { StrictMode, useEffect, useState } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Chat from "./pages/v1/Chat.tsx";
import Home from "./pages/v2/Home/index.tsx";
import Notifications from "./pages/v2/Notifications.tsx";
import Documents from "./pages/v2/Documents.tsx";
import Login from "./pages/v2/Login.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const App = () => {
  const [haveAccessToken, setHaveAccessToken] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    setHaveAccessToken(!!accessToken);
  }, []);

  const router = createHashRouter([
    {
      path: "/login",
      element: haveAccessToken ? <Navigate to="/" replace /> : <Login />,
    },
    {
      element: <ProtectedRoute isLoggedIn={haveAccessToken} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "documents",
          element: <Documents />,
        },
        {
          path: "chat/:id",
          element: <Chat />,
        },
      ],
    },
  ]);

  return (
    <StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
