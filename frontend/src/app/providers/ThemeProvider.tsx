"use client";

import React, { createContext, useContext, useState } from "react";
import { ConfigProvider, ThemeConfig } from "antd";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const lightTheme: ThemeConfig = {
    components: {
      Switch: {
        handleSize: 35,
        trackHeight: 40,
      },
    },
    token: {
      colorBgBase: "#EEEEEE",
      colorBgContainer: "#FAFAFA",
      colorTextBase: "#0C0C0C",
    },
  };

  const darkTheme: ThemeConfig = {
    components: {
      Switch: {
        handleSize: 35,
        trackHeight: 40,
      },
    },
    token: {
      colorBgBase: "#202225",
      colorBgContainer: "#2F3135",
      colorTextBase: "#FFFFFF",
    },
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
