"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextProps, AuthData, UserDataProps } from "@/utils/interfaces";
import Cookies from "js-cookie";
import { GET_USER_BY_ID_URL } from "@/constants/config";
import axios from "axios";

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
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [storedAuthData, setStoredAuthData] =
    useState<AuthData>(defaultAuthData);
  const [userData, setUserData] = useState<UserDataProps | undefined>(
    undefined
  );

  // Get user data by ID
  const getUserById = async (userId: string, accessToken: string) => {
    try {
      const user: any = await axios.get(`${GET_USER_BY_ID_URL}${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setUserData(user.data);
      console.log("User data", user.data);
    } catch (error) {
      console.error("Error in getting user data:", error);
    }
  };

  useEffect(() => {
    // Retrieve authData from cookies
    const storedAuth = Cookies.get("authData");

    if (storedAuth) {
      try {
        const authData: AuthData = JSON.parse(storedAuth);
        const { accessToken } = authData;

        console.log("Auth Data:", authData);

        if (accessToken) {
          getUserById(authData.userId, authData.accessToken);
          setStoredAuthData(authData); // Update state with valid auth data
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to parse authData from cookies:", error);
      }
    }
  }, []); // Ensure this runs only on mount

  //Login function
  const login = (response: AuthData) => {
    console.log("Login Success:", response);

    const authData: AuthData = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      userType: response.userType,
      userId: response.userId,
    };

    setStoredAuthData(authData);
    getUserById(response.userId, response.accessToken);

    // Serialize and store the auth data in cookies (session cookie)
    Cookies.set("authData", JSON.stringify(authData));

    setIsAuthenticated(true);
    console.log("Login Success:", isAuthenticated);
  };

  //Logout function
  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("authData");
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, storedAuthData, login, logout, userData }}
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
//     router.replace("/auth/login");
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
