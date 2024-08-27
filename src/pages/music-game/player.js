import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { Layout, Slider, Typography, Row, Col } from "antd";

const { Content } = Layout;
const { Text } = Typography;

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      audioRef.current.playbackRate = 0.8;  // 设置播放速度为0.8倍
      setIsPlaying(!isPlaying);
    }
  };

  const togglePlayPauseIcon = () => {
    if (isPlaying) {
      return faPause;
    } else {
      return faPlay;
    }
  };

  const getTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = ("0" + Math.floor(time % 60)).slice(-2);
    return `${minute}:${second}`;
  };

  const dragHandler = (value) => {
    audioRef.current.currentTime = value;
    setSongInfo({ ...songInfo, currentTime: value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const activeLibraryHandler = (newSong) => {
    const newSongs = songs.map((song) => {
      if (song.id === newSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  return (
    <Content style={contentStyle}>
      <Row justify="center" style={rowStyle}>
        <Col>
          <Text>{getTime(songInfo.currentTime || 0)}</Text>
        </Col>
        <Col flex="auto" style={trackStyle}>
          <Slider
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            tooltip={{ open: false }}
          />
        </Col>
        <Col>
          <Text>{getTime(songInfo.duration || 0)}</Text>
        </Col>
      </Row>
      <Row justify="center" style={controlRowStyle}>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={togglePlayPauseIcon()}
          size="2x"
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          style={pointer}
        />
      </Row>
    </Content>
  );
};

// Inline styles for Ant Design components
const contentStyle = {
  minHeight: "20vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
};

const rowStyle = {
  width: "50%",
  marginTop: "5vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const controlRowStyle = {
  width: "30%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
};

const trackStyle = {
  flex: 1,
  margin: "0 1rem",
};

const pointer = { cursor: "pointer" };

export default Player;
