import App from "../../App";
import Feedback from "../../pages/feedback/feedback";
import Chapter from "../../pages/learning/chapter";
import MusicGame from "../../pages/music-game/music-game";
import { RouterKey } from "./router-key";

import { createBrowserRouter } from "react-router-dom";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: `/:chapter/${RouterKey.Learning}`,
    element: <Chapter />,
  },
  {
    path: `/:chapter/${RouterKey.MusicGame}`,
    element: <MusicGame />,
  },
  {
    path: `/:chapter/${RouterKey.FeedBack}`,
    element: <Feedback />,
  },
]);
