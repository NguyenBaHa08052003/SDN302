import { useSelector } from "react-redux";

export function useUser() {
  return useSelector((state) => state.userRedux.user);
}

export function useError() {
    return useSelector((state) => state.userRedux.error);
    }
export function useLoading() {
    return useSelector((state) => state.userRedux.loading);
}