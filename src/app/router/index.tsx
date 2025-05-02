import { createBrowserRouter } from "react-router-dom";
import Song from "../../pages/song";
import TrackSearch from "../../pages/search";
import Header from "../../shared/header";

export const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <TrackSearch />
        </>
      ) 
    },
    {
        path: "/song/:trackId",
        element: (
          <>
            <Header />
            <Song />
          </>
        ),
    },
])