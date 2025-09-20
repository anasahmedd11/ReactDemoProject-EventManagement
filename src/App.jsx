import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Authentication from "./pages/Authentication";
import { AuthenticationAction } from "./util/AuthenticationAction";
import Home from "./pages/Home";
import {QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./util/http";
import EventDetails from "./components/EventDetails";
import EditEvent from "./components/EditEvent.jsx";
import AuthContextProvider from "./context/AuthContext";
import NewEvent from "./components/NewEvent.jsx";
import Favorites from "./pages/Favorites.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/auth",
        element: <Authentication />,
        action: AuthenticationAction
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/events/:eventId",
        element: <EventDetails />,
        children: [
          {
            path: "edit",
            element: <EditEvent />,
          },
        ],
      },
      {
        path: "/events/new",
        element: <NewEvent />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);  


function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
export default App
