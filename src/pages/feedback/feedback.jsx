import React, { useEffect, useRef } from "react";

const Feedback = ({ score }) => {
  const canvasRef = useRef(null);
  const imgSrc = "https://ca.pinterest.com/pin/906419862497102015/"; // 替换为你的图片路径

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 设置canvas尺寸
    canvas.width = 800;
    canvas.height = 600;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置圆角矩形的属性
    const rectX = 100;
    const rectY = 50;
    const rectWidth = 600;
    const rectHeight = 500;
    const rectRadius = 50;

    // 绘制圆角矩形
    ctx.beginPath();
    ctx.moveTo(rectX + rectRadius, rectY);
    ctx.lineTo(rectX + rectWidth - rectRadius, rectY);
    ctx.quadraticCurveTo(
      rectX + rectWidth,
      rectY,
      rectX + rectWidth,
      rectY + rectRadius
    );
    ctx.lineTo(rectX + rectWidth, rectY + rectHeight - rectRadius);
    ctx.quadraticCurveTo(
      rectX + rectWidth,
      rectY + rectHeight,
      rectX + rectWidth - rectRadius,
      rectY + rectHeight
    );
    ctx.lineTo(rectX + rectRadius, rectY + rectHeight);
    ctx.quadraticCurveTo(
      rectX,
      rectY + rectHeight,
      rectX,
      rectY + rectHeight - rectRadius
    );
    ctx.lineTo(rectX, rectY + rectRadius);
    ctx.quadraticCurveTo(rectX, rectY, rectX + rectRadius, rectY);
    ctx.closePath();
    ctx.fillStyle = "#f0f0f0"; // 矩形填充颜色
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000"; // 边框颜色
    ctx.stroke();

    // 绘制 "Victory" 文字
    ctx.font = "48px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("Victory", canvas.width / 2, rectY + 80);

    // 加载图片并绘制在圆形内
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const imgX = canvas.width / 2 - 75;
      const imgY = rectY + 120;
      const imgSize = 150;

      ctx.beginPath();
      ctx.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      ctx.restore();
    };

    // 绘制分数
    ctx.font = "36px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, rectY + rectHeight - 50);
  }, [score, imgSrc]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Feedback;
