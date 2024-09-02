import { useNavigate } from "react-router-dom";
import { RouterKey } from "./router-key";

export const useToHome = () => {
  const nv = useNavigate();
  return (options) => {
    nv("/", options);
  };
};

export const useToLearning = () => {
  const nv = useNavigate();
  return (chapter, options) => {
    nv(`/${chapter}/${RouterKey.Learning}`, options);
  };
};

export const useToMusicGame = () => {
  const nv = useNavigate();
  return (chapter, options) => {
    nv(`/${chapter}/${RouterKey.MusicGame}`, options);
  };
};
// export const useToFeedBack = () => {
//   const nv = useNavigate();
//   return (chapter, options) => {
//     nv(`/${chapter}/${RouterKey.FeedBack}`, options);
//   };
// };
export const useToFeedBack = () => {
  const nv = useNavigate();
  return (chapter, score) => {
    console.log(score)
    nv(`/${chapter}/${RouterKey.FeedBack}`, { state: { score } });
  };
};

