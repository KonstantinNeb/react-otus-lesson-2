import React, { ChangeEvent, FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import { Header } from "../../elements/Header";
import { Input } from "../../elements/Input/Input";
import { useUserActions } from "../../hooks/useActions";
import { useLogin } from "../../hooks/useLogin";
import { saveLocalLogin } from "../../localStorage";
import { LocationState } from "../../types";

const FormLogin: FC = () => {
  const [value, setValue] = useState("");
  const { login } = useUserActions();
  const navigate = useNavigate();
  const location = useLocation();

  useLogin();

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || "/";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const onStartClick = () => {
    login(value);
    setValue("");
    navigate(from, { replace: true });
    saveLocalLogin(value);
  };

  return (
    <FlexBox
      flexDirection="vertical"
      justifyContent="center"
      alignItems="center"
      margin="18% auto"
    >
      <Header>Welcome to «Game of life»</Header>
      <FlexBox flexDirection="vertical" width="250px" data-testid="formLogin">
        <Input
          type="text"
          id="login"
          data-testid="inputUserName"
          placeholder="Input your name"
          value={value}
          onChange={onChange}
        />
        <Button onClick={onStartClick} mode="primary" data-testid="l-btn-login">
          Click to start Game
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default FormLogin;
