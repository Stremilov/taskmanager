import { FC, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

const DashBoard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Подождите...</h1>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="/auth" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Загрузка домашней страницы...</div>}>
            <DashBoard />
          </Suspense>
        ),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={<div>Загрузка страницы авторизации...</div>}>
            <Auth />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: "/" });

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
