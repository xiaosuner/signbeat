import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "E:/SignLanguageGame/signbeats/src/index.css";

const { Footer } = Layout;

export const FooterComponent = () => (
  <Footer style={{ position: "fixed", bottom: 0, width: "100%", padding: 0 }}>
    <Menu
      className="FooterComponent"
      mode="horizontal"
      items={[
        {
          key: "home",
          label: (
            <>
              <HomeOutlined style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "16px" }}>Home</div>
            </>
          ),
        },
        {
          key: "vocabulary",
          label: (
            <>
              <HomeOutlined style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "16px" }}>Vocabulary</div>
            </>
          ),
        },
        {
          key: "rank",
          label: (
            <>
              <HomeOutlined style={{ fontSize: "24px" }} />
              <div style={{ fontSize: "16px" }}>Rank</div>
            </>
          ),
        },
      ]}
    />
  </Footer>
);
