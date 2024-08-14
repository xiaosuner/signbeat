import React, { useEffect, useState } from "react";
import { Typography, Image, Layout } from "antd";
import lyrics from "./lyrics"; // Import the lyrics data

const { Title, Text } = Typography;
const { Content } = Layout;

const Song = ({ currentSong, currentTime }) => {
    const [currentLine, setCurrentLine] = useState("");

    useEffect(() => {
        // Find the current line based on the playback time
        const line = lyrics.find((lyric) => currentTime >= lyric.time && currentTime < (lyric.time + 10));
        if (line) {
            setCurrentLine(line);
        }
    }, [currentTime]);

    const getCurrentWord = (currentTime) => {
        if (currentLine) {
            const word = currentLine.words.find((w) => currentTime >= w.time && currentTime < (w.time + 1));
            return word ? word.word : "";
        }
        return "";
    };

    return (
        <Content style={contentStyle}>
            <Image
                src={currentSong.cover}
                alt={currentSong.name}
                style={imageStyle}
                preview={false}
            />
            {/* <Title level={2} style={titleStyle}>{currentSong.name}</Title>
            <Text style={textStyle}>{currentSong.artist}</Text> */}
            <Text style={lyricsStyle}>{currentLine ? currentLine.text : ""}</Text>
            <Text style={highlightStyle}>{getCurrentWord(currentTime)}</Text>
        </Content>
    );
};

// Inline styles for Ant Design components
const contentStyle = {
    marginTop: "10vh",
    minHeight: "50vh",
    maxHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

const imageStyle = {
    width: "20%",
    borderRadius: "50%",
    marginBottom: "2rem",
};

const titleStyle = {
    padding: "3rem 1rem 1rem 1rem",
};

const textStyle = {
    fontSize: "1rem",
};

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
