// import { StrictMode } from "react";
// import "./index.css";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Chats from "./pages/Chats.tsx";
// import Documents from "./pages/Documents.tsx";
// import Notifications from "./pages/Notifications.tsx";
// import Chat from "./pages/Chat.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Chats />,
//   },
//   {
//     path: "notifications",
//     element: <Notifications />,
//   },
//   {
//     path: "documents",
//     element: <Documents />,
//   },
//   {
//     path: "chat/:id",
//     element: <Chat />,
//   },
// ]);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );
import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Chats from "./pages/Chats.tsx";
import Documents from "./pages/Documents.tsx";
import Notifications from "./pages/Notifications.tsx";
import Chat from "./pages/Chat.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Chats />,
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
