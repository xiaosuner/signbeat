import React, { useState, useRef, useEffect, useMemo } from "react";
import { Layout } from "antd";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import Player from "./player";
import Song from "./song";
import gesture_recognizer_task from "../../config/models/gesture_recognizer.task"; // Adjust the path if necessary

import { useMemoizedFn, useMount, useThrottleFn, useUnmount } from "ahooks";
import { useCurrChapterMusicGame } from "../../utils/hooks/chapter";
import lyrics from "./lyrics";

const { Content } = Layout;

const runningMode = "VIDEO";

const MusicGame = () => {
  const [songs] = useCurrChapterMusicGame();

  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(() => songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0 });
  const [category, setCategory] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [startText, setStartText] = useState("准备好了吗？");

  //手势识别
  const [currentWord, setCurrentWord] = useState(null);
  const [gestureResult, setGestureResult] = useState(null);

  // References for video and canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const fn = useRef(null);

  const predictWebcam = useMemoizedFn(
    async (gestureRecognizer, runningMode) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const drawingUtils = new DrawingUtils(ctx);

      fn.current = async () => {
        if (runningMode === "IMAGE") {
          try {
            await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
          } catch (error) {
            console.error(error);
          }
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
          setGestureResult(gesture); // 更新手势结果状态
          run(gesture);
        } else {
          setGestureResult(null); // 清除手势结果状态
          run(null);
        }

        requestAnimationFrame(fn.current);
      };

      fn.current();
    }
  );

  const { run } = useThrottleFn(setCategory, { wait: 100 });

  const initializeGestureRecognizer = useMemoizedFn(async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const gestureRecognizer = await GestureRecognizer.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: gesture_recognizer_task,
            delegate: "GPU",
          },
          runningMode,
        }
      );
      const constraints = { video: true };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", () =>
            predictWebcam(gestureRecognizer, runningMode)
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  useUnmount(() => {
    window.cancelAnimationFrame(fn.current);
  });
  useMount(() => {
    initializeGestureRecognizer();
  });

  const score = useMemo(() => {
    return Number(((category?.score || 0) * 100).toFixed(2));
  }, [category?.score]);

  useEffect(() => {
    if (!isReady && category?.categoryName === "Thumb_Up" && score > 70) {
      setStartText("Start");
      setTimeout(() => {
        setIsReady(true);
        setIsPlaying(true);
        audioRef.current?.play().catch((err) => {
          console.log("%c Line:156 🥒 err", "color:#f5ce50", err);
        });
        setStartText("");
      }, 1000);
    }
  }, [category, isReady, score]);

  useEffect(() => {
    // 只有在音乐播放时才打印进度
    if (isPlaying) {
      console.log(`当前播放时间：${songInfo.currentTime.toFixed(2)}秒`);
    }
  }, [songInfo.currentTime, isPlaying]);  // 依赖项包括currentTime和isPlaying，确保任何一个变化都能触发更新
  //显示当前词
  useEffect(() => {
    const word = lyrics.flatMap(line => line.words).find(w => w.time.toFixed(1) === songInfo.currentTime.toFixed(1));
    console.log("word：",word)
    setCurrentWord(word);
  }, [songInfo.currentTime]);
  //判断手势
  useEffect(() => {
    if (currentWord && currentWord.recognize) {
      // 检查手势是否符合要求
      //console.log("当前单词：",currentWord.word)
      if (gestureResult?.categoryName === currentWord.expectedGesture) {
        console.log("当前手势：",gestureResult.categoryName)
        console.log("手势正确");
      } else {
        console.log("手势错误");
      }
      const timeoutId = setTimeout(() => {
        setCurrentWord(null);  // 超时自动失败消失
      }, 2000);  // 超时时间为2秒

      return () => clearTimeout(timeoutId);
    }
  }, [currentWord, gestureResult]);

  return (
    <Layout style={{ transition: "all 0.5s ease" }}>
      <Content
        style={{ margin: "0 20rem", position: "relative", textAlign: "center" }}
      >
        
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
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <canvas
            ref={canvasRef}
            width="480"
            height="360"
            className="output_canvas"
          ></canvas>
        </div>

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
          <h1>Gesture: {category?.categoryName}</h1>
          <h1>Confidence: {score}%</h1>
        </div>
        <Song currentSong={currentSong} currentTime={songInfo.currentTime} style={{ marginTop: "2rem" }}/>
      </Content>
    </Layout>
  );
};

export default MusicGame;
