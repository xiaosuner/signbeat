import { useParams } from "react-router-dom";
import { chapterData } from "../../config/data-conf/chapter-data";

export const useCurrChapter = () => {
  const { chapter } = useParams();

  const item = chapterData.find((v) => v.chapter === chapter);

  return [item, chapter];
};

export const useCurrChapterLearning = () => {
  const [{ learning = [] }, chapter] = useCurrChapter();
  return [learning, chapter];
};

export const useCurrChapterMusicGame = () => {
  const [{ musicGame = [] }, chapter] = useCurrChapter();
  return [musicGame, chapter];
};
export const useCurrChapterFeedback = () => {
  const [{ feedback = [] }, chapter] = useCurrChapter();
  return [feedback, chapter];
};
