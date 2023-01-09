import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants";
import { loadLocalLogin } from "../localStorage";
import { selectIsLogined } from "../state/userSlice/userSelectors";
import { useUserActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useUserActions();
  const isLogined = useTypedSelector(selectIsLogined);

  useEffect(() => {
    login(loadLocalLogin());
    isLogined ? navigate(ROUTE.ROOT) : navigate(ROUTE.AUTH);
  }, [isLogined, navigate]);

  return { isLogined };
};
