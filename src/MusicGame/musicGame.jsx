import React, { useState, useRef } from "react";
import { Layout } from "antd";

// Import components
import Player from "./player";
import Song from "./song";
// Import data
import data from "./data";

const { Content } = Layout;

const MusicGame = () => {
    // Ref for audio element
    const audioRef = useRef(null);

    // State for songs and current song
    const [songs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    // Function to update the song's current time and duration
    const updateTimeHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime, duration });
    };

    return (
        <Layout style={{ transition: "all 0.5s ease" }}>
            <Content style={{ margin: "0 20rem" }}>
                <Song currentSong={currentSong} />
                <Player
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong}
                    audioRef={audioRef}
                    songInfo={songInfo}
                    setSongInfo={setSongInfo}
                />
                <audio
                    onLoadedMetadata={updateTimeHandler}
                    onTimeUpdate={updateTimeHandler}
                    ref={audioRef}
                    src={currentSong.audio}
                />
            </Content>
        </Layout>
    );
};

export default MusicGame;
