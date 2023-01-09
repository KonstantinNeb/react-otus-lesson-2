import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { appActions } from "../state/appSlice/appSlice";
import { userActions } from "../state/userSlice/userSlice";

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(appActions, dispatch);
};

export const useUserActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(userActions, dispatch);
};
