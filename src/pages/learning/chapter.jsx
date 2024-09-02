import { useEffect, useState, useRef, useMemo } from "react";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { Flex, Modal, Steps } from "antd";
import gesture_recognizer_task from "../../config/models/gesture_recognizer3.task";
import { useToMusicGame } from "../../config/app-router/navigate";
import { useCurrChapterLearning } from "../../utils/hooks/chapter";

const Chapter = () => {
  const toMusicGame = useToMusicGame();

  const [items, chapter] = useCurrChapterLearning();

  useEffect(() => {
    const demosSection = document.getElementById("demos");
    let gestureRecognizer;
    let runningMode = "IMAGE";
    const videoHeight = "360px";
    const videoWidth = "480px";

    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: gesture_recognizer_task,
          delegate: "GPU",
        },
        runningMode: runningMode,
      });
      demosSection?.classList.remove("invisible");
    };
    createGestureRecognizer();

    const video = document.getElementById("webcam");
    const canvasElement = document.getElementById("output_canvas");
    const canvasCtx = canvasElement?.getContext("2d");
    const gestureOutput = document.getElementById("gesture_output");

    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    if (hasGetUserMedia()) {
      const enableWebcamButton = document.getElementById("webcamButton");
      enableWebcamButton.addEventListener("click", enableCam);
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }

    function enableCam() {
      if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }

      const constraints = {
        video: true,
      };
      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        if (video) {
          video.srcObject = stream;
          video.addEventListener("loadeddata", predictWebcam);
        }
      });
    }

    let lastVideoTime = -1;
    let results = undefined;
    async function predictWebcam() {
      const webcamElement = document.getElementById("webcam");
      if (!canvasElement || !webcamElement) {
        console.error("Canvas element or webcam element not found!");
        return;
      }
      // Now let's start detecting the stream.
      if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({
          runningMode: "VIDEO",
          numHands: 2,
        });
      }

      let nowInMs = Date.now();
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      const drawingUtils = new DrawingUtils(canvasCtx);

      canvasElement.style.height = videoHeight;
      webcamElement.style.height = videoHeight;
      canvasElement.style.width = videoWidth;
      webcamElement.style.width = videoWidth;

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
      canvasCtx.restore();
      if (results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        gestureOutput.style.width = videoWidth;
        const value1 = results.gestures[0][0].categoryName;
        setCategoryName(value1);

        const value2 = parseFloat(
          (results.gestures[0][0].score * 100).toString()
        ).toFixed(2);
        setCategoryScore(value2);
        const handedness = results.handednesses[0][0].displayName;
        gestureOutput.innerText = `GestureRecognizer: ${value1}\n Confidence: ${value2} %\n Handedness: ${handedness}`;
      } else {
        gestureOutput.style.display = "none";
      }
      window.requestAnimationFrame(predictWebcam);
    }
  }, []);

  const [categoryScore, setCategoryScore] = useState(0);
  const [categoryName, setCategoryName] = useState(null);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const isShowTip = useRef(false);
  
  const isWaiting = useRef(false); // 用来跟踪延迟状态
  useEffect(() => {
    if (current <= items.length && categoryScore >= 70) {
      const title = items[current]?.title;
      const bool = title === categoryName;
      if (bool && !isWaiting.current) { // 仅当没有延迟进行时才继续
        isWaiting.current = true; // 标记为延迟正在进行
        setTimeout(() => {
          next();
          isWaiting.current = false; // 延迟结束后重置标记
  
          if (title === items.at(-1)?.title && !isShowTip.current) {
            isShowTip.current = true;
            Modal.confirm({
              title: "成功 ！",
              width: 240,
              centered: true,
              cancelButtonProps: { style: { display: "none" } },
              maskClosable: false,
              keyboard: false,
              okText: "确定",
              onOk: () => {
                isShowTip.current = false;
                toMusicGame(chapter); // 点击确定后跳转到 musicGame 页面
              },
            });
          }
        }, 1000); // 延迟1秒
      }
    }
  }, [categoryName, categoryScore, chapter, current, items, toMusicGame]);
  

  const stepsItems = useMemo(() => {
    return items.map((item, index) => ({
      title: item.title,
      description:
        current === index ? (
          <img
            src={item.gif}
            alt={item.title}
            style={{ width: "180px", height: "150px" }}
          />
        ) : (
          false
        ),
    }));
  }, [items, current]);

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Chapter 1</h1> {/* 添加标题并居中对齐 */}
      
      <Flex
        style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row" }} // 修改为 alignItems: "flex-start" 使元素顶部对齐
      >
        <Steps
          style={{ width: 300, marginRight: "20px" }} // 添加右边距使内容不贴太近
          direction="vertical"
          current={current}
          items={stepsItems}
        />
  
        <div>
          <h2>Sign: {categoryName}</h2>
          <h2>Accuracy: {categoryScore}</h2>
            {/* Is there a Hand?{" "}
            {categoryScore >= 70 ? (
              <span style={{ color: "green" }}>Yes</span>
            ) : (
              <span style={{ color: "red" }}>No</span>
            )} */}
         
  
          <section id="demos" className="invisible">
            <div id="liveView" className="videoView">
              <button id="webcamButton" className="mdc-button mdc-button--raised" style={{ marginTop: "-10px" }}>
                <span className="mdc-button__ripple"></span>
                <span className="mdc-button__label">ENABLE WEBCAM</span>
              </button>
              <div style={{ position: "relative", marginTop: "10px" }}>
                <video id="webcam" autoPlay playsInline></video>
                <canvas
                  className="output_canvas"
                  id="output_canvas"
                  width="1280"
                  height="720"
                  style={{ position: "absolute", left: "0px", top: "0px" }}
                ></canvas>
                <p id="gesture_output" className="output" />
              </div>
            </div>
          </section>
        </div>
      </Flex>
    </div>
  );
  
  
};

export default Chapter;
