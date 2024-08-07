import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 引入 useNavigate 钩子
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { Flex, Modal, Steps } from "antd";
import gesture_recognizer_task from "../models/gesture_recognizer.task";

const items = [
  { title: "Closed_Fist", gif: "https://www.seekpng.com/png/detail/37-372109_final-blends-fist-cartoon-png.png"},
  { title: "Open_Palm", gif: "https://thumbs.dreamstime.com/z/image-cartoon-human-hand-gesture-open-palm-waving-vector-illustration-isolated-white-background-60283111.jpg" },
  { title: "Pointing_Up" , gif: "https://image.pngaaa.com/441/1126441-middle.png"},
  { title: "Thumb_Down", gif: "https://cdn-icons-png.flaticon.com/512/10187/10187338.png" },
  { title: "Thumb_Up" , gif: "https://static.vecteezy.com/system/resources/previews/000/553/899/original/vector-cartoon-hand-making-positive-thumbs-up-gesture.jpg"},
  { title: "Victory" , gif: "https://th.bing.com/th/id/OIP.t8Mwhbq4I7WUdKUORpokFwHaEK?rs=1&pid=ImgDetMain"},
  { title: "ILoveYou", gif: "https://png.pngtree.com/png-vector/20221222/ourlarge/pngtree-cartoon-hand-drawn-i-love-you-gesture-line-illustration-vector-decoration-png-image_6487645.png" },
];

const Chapter1 = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  useEffect(() => {
    const demosSection = document.getElementById("demos");
    let gestureRecognizer;
    let runningMode = "IMAGE";
    const videoHeight = "360px";
    const videoWidth = "480px";

    const createGestureRecognizer = async () => {
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
      demosSection?.classList.remove("invisible");
    };
    createGestureRecognizer();

    const imageContainers = document.getElementsByClassName("detectOnClick");

    for (let i = 0; i < imageContainers.length; i++) {
      imageContainers[i].children[0].addEventListener("click", handleClick);
    }

    async function handleClick(event) {
      if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
      }

      if (runningMode === "VIDEO") {
        runningMode = "IMAGE";
        await gestureRecognizer.setOptions({ runningMode: "IMAGE" });
      }

      const allCanvas =
        event.target.parentNode.getElementsByClassName("canvas");
      for (var i = allCanvas.length - 1; i >= 0; i--) {
        const n = allCanvas[i];
        n.parentNode.removeChild(n);
      }

      const results = gestureRecognizer.recognize(event.target);

      if (results.gestures.length > 0) {
        const p = event.target.parentNode.childNodes[3];
        p.setAttribute("class", "info");

        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(
          (results.gestures[0][0].score * 100).toString()
        ).toFixed(2);
        const handedness = results.handednesses[0][0].displayName;

        p.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
        p.style =
          "left: 0px;" +
          "top: " +
          event.target.height +
          "px; " +
          "width: " +
          (event.target.width - 10) +
          "px;";

        const canvas = document.createElement("canvas");
        canvas.setAttribute("class", "canvas");
        canvas.setAttribute("width", event.target.naturalWidth + "px");
        canvas.setAttribute("height", event.target.naturalHeight + "px");
        canvas.style =
          "left: 0px;" +
          "top: 0px;" +
          "width: " +
          event.target.width +
          "px;" +
          "height: " +
          event.target.height +
          "px;";

        event.target.parentNode.appendChild(canvas);
        const canvasCtx = canvas.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);
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
            lineWidth: 1,
          });
        }
      }
    }

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

      if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
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

  useEffect(() => {
    if (current <= items.length && categoryScore >= 70) {
      const title = items[current]?.title;
      const bool = title === categoryName;
      if (bool) {
        next();

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
              navigate("../MusicGame/musicGame"); // 点击确定后跳转到 musicGame 页面
            },
          });
        }
      }
    }
  }, [categoryName, categoryScore, current, navigate]);

  return (
    <Flex>
      <Steps
        style={{ width: 300 }}
        direction="vertical"
        current={current}
        items={items.map(item => ({
          title: item.title,
          description: <img src={item.gif} alt={item.title} style={{ width: '180px', height: '150px' }} />,
        }))}
      />

      <div>
        <h1>categoryName:{categoryName}</h1>
        <h1>
          Is there a Hand?{" "}
          {categoryScore >= 70 ? (
            <span style={{ color: "green" }}>Yes</span>
          ) : (
            <span style={{ color: "red" }}>No</span>
          )}
          <h6>categoryScore:{categoryScore}</h6>
        </h1>

        <section id="demos" className="invisible">
          <div id="liveView" className="videoView">
            <button id="webcamButton" className="mdc-button mdc-button--raised">
              <span className="mdc-button__ripple"></span>
              <span className="mdc-button__label">ENABLE WEBCAM</span>
            </button>
            <div style={{ position: "relative" }}>
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
  );
};

export default Chapter1;
