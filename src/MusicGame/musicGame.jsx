import React, { useState, useRef, useEffect } from "react";
import { Layout } from "antd";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import Player from "./player";
import Song from "./song";
import data from "./data";
import gesture_recognizer_task from "../models/gesture_recognizer.task"; // Adjust the path if necessary

const { Content } = Layout;

const MusicGame = () => {
  const audioRef = useRef(null);
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [categoryName, setCategoryName] = useState(null);
  const [categoryScore, setCategoryScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [startText, setStartText] = useState("准备好了吗？");

  // References for video and canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  useEffect(() => {
    let gestureRecognizer;
    let runningMode = "VIDEO";

    const initializeGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: gesture_recognizer_task,
          delegate: "GPU",
        },
        runningMode: runningMode,
      });

      const constraints = { video: true };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", () =>
            predictWebcam(gestureRecognizer)
          );
        }
      });
    };

    const predictWebcam = async (gestureRecognizer) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const drawingUtils = new DrawingUtils(ctx);

      const detectGesture = async () => {
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
        }

        const results = gestureRecognizer.recognizeForVideo(video, Date.now());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the video frame to the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (results.landmarks) {
          for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(
              landmarks,
              GestureRecognizer.HAND_CONNECTIONS,
              {
                color: "#00FF00",
                lineWidth: 5,
              }
            );
            drawingUtils.drawLandmarks(landmarks, {
              color: "#FF0000",
              lineWidth: 2,
            });
          }
        }

        if (results.gestures.length > 0) {
          const gesture = results.gestures[0][0];
          setCategoryName(gesture.categoryName);
          setCategoryScore((gesture.score * 100).toFixed(2));
        } else {
          setCategoryName(null);
          setCategoryScore(0);
        }

        requestAnimationFrame(detectGesture);
      };

      detectGesture();
    };

    initializeGestureRecognizer();
    console.log("initializeGestureRecognizer");
  }, []);

  useEffect(() => {
    if (!isReady && categoryName === "Thumb_Up" && Number(categoryScore) > 70) {
      setStartText("Start");
      setTimeout(() => {
        setIsReady(true);
        setIsPlaying(true);
        audioRef.current.play();
        setStartText("");
      }, 1000);
    }
  }, [categoryName, categoryScore, isReady]);

  return (
    <Layout style={{ transition: "all 0.5s ease" }}>
      <Content
        style={{ margin: "0 20rem", position: "relative", textAlign: "center" }}
      >
        <Song currentSong={currentSong} currentTime={songInfo.currentTime} />
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
        />
        <audio
          onLoadedMetadata={updateTimeHandler}
          onTimeUpdate={updateTimeHandler}
          ref={audioRef}
          src={currentSong.audio}
        />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ display: "none" }}
        ></video>
        <canvas
          ref={canvasRef}
          width="480"
          height="360"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        ></canvas>
        {!isReady && (
          <div
            style={{
              zIndex: 11,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "2rem",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            {startText}
          </div>
        )}
        <div style={{ zIndex: 11 }}>
          <h1>Gesture: {categoryName}</h1>
          <h1>Confidence: {categoryScore}%</h1>
        </div>
      </Content>
    </Layout>
  );
};

export default MusicGame;
