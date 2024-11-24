import React, { createContext, useContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/utils/database.types";

interface AuthContextProps {
  user: User | null;
}

// `undefined` cho phép TypeScript hiểu rõ giá trị khởi tạo ban đầu.
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Đảm bảo `useAuth` được sử dụng trong `AuthProvider`.
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
