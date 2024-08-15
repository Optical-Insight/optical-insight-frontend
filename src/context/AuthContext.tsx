"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextProps, AuthData } from "@/utils/interfaces";

const defaultAuthData: AuthData = {
  accessToken: "",
  refreshToken: "",
  userType: "",
  userId: "",
};

// Create the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [storedAuthData, setStoredAuthData] =
    useState<AuthData>(defaultAuthData);

  useEffect(() => {
    const storedAuth = localStorage.getItem("authData");

    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (response: AuthData) => {
    console.log("Login Success:", response);

    // Create an object to hold all the related data
    const authData = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      userType: response.userType,
      userId: response.userId,
    };

    console.log("authData: ", authData);
    setStoredAuthData(authData);

    // Serialize the object to a JSON string and store it in localStorage
    localStorage.setItem("authData", JSON.stringify(authData));

    router.replace("/dashboard/home");
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authData");
    router.replace("/auth/login/sys-admin");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, storedAuthData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
