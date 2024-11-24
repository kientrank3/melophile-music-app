// hooks/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true); // Đánh dấu rằng component đã được mount
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.replace("/account/login");
    }
  }, [user, isMounted, router]);

  if (!user) {
    return null; // Tránh render bất cứ thứ gì nếu user chưa xác định
  }

  return <>{children}</>;
};

export default ProtectedRoute;
