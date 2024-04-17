import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./pages/Login/login";
import Todo from "./pages/Home/home";
import Home from "./pages/Home/home";

export enum SharedRoutes {
  Login = "/login",
}

export const sharedRoute = {
  Login: () => SharedRoutes.Login,
};

export const routes = createBrowserRouter([
  {
    index: true,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: SharedRoutes.Login,
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <Todo />
      </ProtectedRoute>
    ),
  },
]);
