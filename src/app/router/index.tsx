import { createBrowserRouter } from "react-router-dom";
import Song from "../pages/song";
import TrackSearch from "../pages/search";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <TrackSearch />,
    },
    {
        path: "/song/:id",
        element: <Song />,
    },
])