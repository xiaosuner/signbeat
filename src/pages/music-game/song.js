import React, { useMemo } from "react";
import { Typography, Layout } from "antd";
import lyrics from "./lyrics"; // Import the lyrics data
import { getCurrentWord } from "./utils";

import { CheckCircleTwoTone } from "@ant-design/icons";

const { Text } = Typography;
const { Content } = Layout;

const Song = ({ currentSong, currentTime, showSuccess }) => {
  const [lineText, wordText] = useMemo(() => {
    const line = lyrics.find(
      (lyric) =>
        currentTime >= lyric.starttime && currentTime < lyric.starttime + 10
    );
    const text1 = line ? line.text : "";
    let text2 = "";
    if (line) {
      const word = getCurrentWord(currentTime, line.words);
      if (word) {
        text2 = word.word;
      }
    }

    return [text1, text2];
  }, [currentTime]);

  return (
    <div style={contentStyle}>
      {/* <Title level={2} style={titleStyle}>{currentSong.name}</Title>
            <Text style={textStyle}>{currentSong.artist}</Text> */}
      <Text style={lyricsStyle}>{lineText}</Text>
      <Text style={highlightStyle}>{wordText}</Text>
      {showSuccess && (
        <CheckCircleTwoTone twoToneColor="green" style={{ fontSize: 40 }} />
      )}
    </div>
  );
};

// Inline styles for Ant Design components
const contentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  left: "50%",
  top: "calc(50% + 180px)",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
};

// const imageStyle = {
//   width: "20%",
//   borderRadius: "50%",
//   marginBottom: "2rem",
// };

// const titleStyle = {
//   padding: "3rem 1rem 1rem 1rem",
// };

// const textStyle = {
//   fontSize: "1rem",
// };

const lyricsStyle = {
  marginTop: "1rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const highlightStyle = {
  marginTop: "1rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "red",
};

export default Song;
