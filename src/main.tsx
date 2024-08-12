import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chats from "./pages/Chats.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Documents from "./pages/Documents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chats />,
  },
  {
    path: "notifications",
    element: <MainLayout>notifications</MainLayout>,
  },
  {
    path: "documents",
    element: <Documents />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
