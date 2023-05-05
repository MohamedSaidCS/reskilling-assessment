import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Books from "./pages/Books/Books";
import Auth from "./pages/Auth/Auth";
import Book from "./pages/Book/Book";
import Search from "./pages/Search/Search";

function App() {
  const queryClient = new QueryClient();

  const token = localStorage.getItem("token");

  const router = createBrowserRouter([
    { path: "/auth", element: token ? <Navigate to={"/"} /> : <Auth /> },

    {
      path: "/",
      element: !token ? <Books /> : <Navigate to={"/auth"} />,
      children: [{ path: ":id", element: <Book /> }],
    },
    {
      path: "/search",
      element: token ? <Search /> : <Navigate to={"/auth"} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
