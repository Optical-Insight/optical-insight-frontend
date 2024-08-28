"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextProps, AuthData } from "@/utils/interfaces";
import Cookies from "js-cookie";

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
  const [storedAuthData, setStoredAuthData] =
    useState<AuthData>(defaultAuthData);
  const router = useRouter();

  useEffect(() => {
    // Retrieve authData from cookies
    const storedAuth = Cookies.get("authData");

    if (storedAuth) {
      try {
        const authData: AuthData = JSON.parse(storedAuth);
        const { accessToken } = authData;

        if (accessToken) {
          setStoredAuthData(authData); // Update state with valid auth data
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to parse authData from cookies:", error);
      }
    }
  }, []); // Ensure this runs only on mount

  const login = (response: AuthData) => {
    console.log("Login Success:", response);

    const authData: AuthData = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      userType: response.userType,
      userId: response.userId,
    };

    setStoredAuthData(authData);

    // Serialize and store the auth data in cookies
    Cookies.set("authData", JSON.stringify(authData), { expires: 7 }); // Set cookie to expire in 7 days

    router.replace("/dashboard/home");
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("authData"); // Remove authData from cookies
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

// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AuthContextProps, AuthData } from "@/utils/interfaces";
// import Cookies from "js-cookie";

// const defaultAuthData: AuthData = {
//   accessToken: "",
//   refreshToken: "",
//   userType: "",
//   userId: "",
// };

// // Create the context with default values
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// // Create a provider component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [storedAuthData, setStoredAuthData] =
//     useState<AuthData>(defaultAuthData);
//   const router = useRouter();

//   useEffect(() => {
//     const storedAuth = localStorage.getItem("authData");

//     if (storedAuth) {
//       try {
//         const authData: AuthData = JSON.parse(storedAuth);
//         const { accessToken } = authData;

//         if (accessToken) {
//           setStoredAuthData(authData); // Update state with valid auth data
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Failed to parse authData from localStorage:", error);
//       }
//     }
//   }, []); // Ensure this runs only on mount

//   const login = (response: AuthData) => {
//     console.log("Login Success:", response);

//     const authData: AuthData = {
//       accessToken: response.accessToken,
//       refreshToken: response.refreshToken,
//       userType: response.userType,
//       userId: response.userId,
//     };

//     setStoredAuthData(authData);

//     // Serialize and store the auth data in localStorage
//     localStorage.setItem("authData", JSON.stringify(authData));

//     router.replace("/dashboard/home");
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("authData");
//     router.replace("/auth/login/sys-admin");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, storedAuthData, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the authentication context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
