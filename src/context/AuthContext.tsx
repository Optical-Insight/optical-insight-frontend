import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContextProps, LoginResponse } from "@/utils/interfaces";

// Create the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");

    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      const accessToken = authData.accessToken;

      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (response: LoginResponse) => {
    console.log("Login Success:", response.data);

    // Create an object to hold all the related data
    const authData = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      userType: response.data.userType,
      userId: response.data.userId,
    };
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
