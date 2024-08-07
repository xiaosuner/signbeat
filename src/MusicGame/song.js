import React from "react";
import { Typography, Image, Layout } from "antd";

const { Title, Text } = Typography;
const { Content } = Layout;

const Song = ({ currentSong }) => {
    return (
        <Content style={contentStyle}>
            <Image
                src={currentSong.cover}
                alt={currentSong.name}
                style={imageStyle}
                preview={false}
            />
            <Title level={2} style={titleStyle}>{currentSong.name}</Title>
            <Text style={textStyle}>{currentSong.artist}</Text>
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

export default Song;
