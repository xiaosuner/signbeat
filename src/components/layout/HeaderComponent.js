import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

export const HeaderComponent = () => (
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          label: "Home",
        },
        {
          key: "2",
          label: "About",
        },
        {
          key: "3",
          label: "Contact",
        },
      ]}
    />
  </Header>
);
