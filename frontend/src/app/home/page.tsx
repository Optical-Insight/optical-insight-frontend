"use client";
import React from "react";
import { Layout, theme } from "antd";
import styles from "@/styles/home/home";

const { Content } = Layout;

function HomePage() {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const his = "hi";

  return (
    <Content style={{ ...styles.container, background: colorBgBase }}>
      Home
    </Content>
  );
}

export default HomePage;
