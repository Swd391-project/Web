"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export type User = {
  userId: string;
  username: string;
  email: string;
  userImage: string;
  fullName: string;
  role: "Staff" | "Admin" | "Manager" | "Customer";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const router = useRouter();
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        "https://swdbbmsapi20240605224753.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {

        const { token, "full-name": fullName, image } = await response.json();
        setCookie(null, 'sessionToken', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        const decodedUser: User = jwtDecode(token);
        const user = {
          userId: decodedUser.userId,
          username: decodedUser.username,
          email: decodedUser.email,
          userImage: image,
          fullName: fullName,
          role: decodedUser.role,
        };

        setUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        // window.localStorage.setItem("fullName", fullName);
        toast.success("Đăng nhập thành công");
        router.push('/');
      } else {
        const errorMessage = await response.text();
        console.log("Login failed. Error message:", errorMessage);
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
