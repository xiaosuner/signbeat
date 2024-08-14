import React from "react";
import { Card, Progress, Row, Col } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useToLearning } from "../../config/app-router/navigate";
import { chapterData } from "../../config/data-conf/chapter-data.js";

export const ContentComponent = () => {
  const toLearning = useToLearning();

  return (
    <div className="site-layout-content">
      {chapterData.map((item) => (
        <Row
          key={item.chapter}
          gutter={[16, 16]}
          style={{ marginBottom: "16px" }}
        >
          <Col span={24}>
            <Card
              hoverable
              onClick={() => toLearning(item.chapter)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1, paddingRight: "20px" }}>
                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      backgroundColor: "rgba(255, 165, 0, 0.5)",
                      borderRadius: "8px",
                      padding: "2px 8px",
                      display: "inline-block",
                    }}
                  >
                    {item.smallTitle}
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.mainTitle}
                  </div>
                  <div style={{ marginBottom: "10px", fontSize: "12px" }}>
                    {item.description}
                  </div>
                  <Progress percent={item.progress} />
                </div>
                <div style={{ marginLeft: "20px", flexShrink: 0 }}>
                  {item.completed ? (
                    <CheckCircleOutlined
                      style={{ color: "green", fontSize: "24px" }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "red", fontSize: "24px" }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
};
