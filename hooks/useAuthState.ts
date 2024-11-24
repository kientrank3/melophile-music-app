import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useAuthState = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user;
};
