import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("visitor");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${serverBaseUrl}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsLoggedIn(true);
        setUserRole(data.user?.role || "user");
        setUser(data.user);
      } else {
        // ถ้าไม่มีคุกกี้หรือหมดอายุ ให้ดีดกลับเป็นคนนอกเกาะ (visitor)
        setIsLoggedIn(false);
        setUserRole("visitor");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${serverBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Backend logout error:", error);
    } finally {
      setIsLoggedIn(false);
      setUserRole("visitor");
      setUser(null);
      window.location.href = "/"; // ล็อกเอาท์เสร็จถีบกลับหน้าแรกสวยๆ จ้า
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userRole,
        setUserRole,
        user,
        loading,
        checkAuthStatus,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
