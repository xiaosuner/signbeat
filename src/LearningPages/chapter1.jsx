// import React, { useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
// import {
//   drawConnectors,
//   drawLandmarks,
// } from "@mediapipe/drawing_utils/drawing_utils";
// import { Camera } from "@mediapipe/camera_utils/camera_utils";

// const Chapter1 = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     // 初始化Hands对象，并指定资源文件的路径
//     const hands = new Hands({
//       locateFile: (file) => {
        
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1626903359/${file}`;
//       },
//     });
//     console.log(Hands.VERSION);
//      // 设置Hands对象的选项
//      hands.setOptions({
//       maxNumHands: 2, // 最多检测两只手
//       minDetectionConfidence: 0.5, // 最小检测置信度
//       minTrackingConfidence: 0.5, // 最小跟踪置信度
//     });
//     // 定义Hands对象的回调函数
//     hands.onResults(onResults);
//     // 如果Webcam元素已加载
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null
//     ) {
//       // 初始化Camera对象，并设置帧处理函数
//       const camera = new Camera(webcamRef.current.video, {
//         onFrame: async () => {
//           await hands.send({ image: webcamRef.current.video });
//         },
//         width: 1280,
//         height: 720,
//       });
//       camera.start();
//     }
//   }, []);
//  // 定义Hands对象的结果处理函数
//   const onResults = (results) => {
//     const videoWidth = webcamRef.current.video.videoWidth;
//     const videoHeight = webcamRef.current.video.videoHeight;
//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;
//     const canvasElement = canvasRef.current;
//     const canvasCtx = canvasElement.getContext("2d");
//     canvasCtx.save();
//     canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
//     canvasCtx.translate(videoWidth, 0);
//     canvasCtx.scale(-1, 1);   // 翻转画布，使得视频和绘图对齐
//     canvasCtx.drawImage(
//       results.image,
//       0,
//       0,
//       canvasElement.width,
//       canvasElement.height
//     );
//     // 绘制手部关键点和连接线
//     if (results.multiHandLandmarks) {
      
//       for (const landmarks of results.multiHandLandmarks) {
//         drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
//           color: "#00FF00",
//           lineWidth: 5,
//         });
//         drawLandmarks(canvasCtx, landmarks, { color: "#FFFFFF", lineWidth: 2 });
//       }
//     }
//     canvasCtx.restore();
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         mirrored={true}
//         ref={webcamRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: "0",
//           right: "0",
//           textAlign: "center",
//           zindex: 9,
//           width: 800,
//           height: 600,
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: "0",
//           right: "0",
//           textAlign: "center",
//           zindex: 9,
//           width: 800,
//           height: 600,
//         }}
//       ></canvas>
//     </div>
//   );
// };

// export default Chapter1;
import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../models/hand_landmarker.task";

const Chapter1 = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [handPresence, setHandPresence] = useState(null);

    useEffect(() => {
        let handLandmarker;
        let animationFrameId;

        const initializeHandDetection = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
                );
                handLandmarker = await HandLandmarker.createFromOptions(
                    vision, {
                        baseOptions: { modelAssetPath: hand_landmarker_task },
                        numHands: 2,
                        runningMode: "video"
                    }
                );
                detectHands();
            } catch (error) {
                console.error("Error initializing hand detection:", error);
            }
        };

    const drawLandmarks = (landmarksArray) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    landmarksArray.forEach(landmarks => {
        landmarks.forEach(landmark => {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle for each landmark
            ctx.fill();
        });
    });
};

        const detectHands = () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
                setHandPresence(detections.handednesses.length > 0);

                // Assuming detections.landmarks is an array of landmark objects
                if (detections.landmarks) {
                    drawLandmarks(detections.landmarks);
                }
            }
            requestAnimationFrame(detectHands);
        };

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                await initializeHandDetection();
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startWebcam();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            if (handLandmarker) {
                handLandmarker.close();
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <>
        <h1>Is there a Hand? {handPresence ? "Yes" : "No"}</h1>
        <div style={{ position: "relative" }}>
            <video ref={videoRef} autoPlay playsInline ></video>
            <canvas ref={canvasRef} style={{ backgroundColor: "black" , width:"600px", height:"480px"}}></canvas>
        </div>
    </>
    );
};

export default Chapter1;