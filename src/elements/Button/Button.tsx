import styled from "styled-components";

interface ButtonProps {
  mode?: "primary" | "secondary";
}

export const Button = styled.button<ButtonProps>`
  font-family: "Times New Roman";
  font-size: 18px;
  background-color: ${({ mode }) => getBackgroundColor(mode)};
  cursor: pointer;
  border-radius: 4px;
  border: 4px solid #ced4da;
  height: 40px;

  &:hover:enabled {
    transform: scale(1.04);
  }
`;

const backgroundColor = {
  primary: "#ebf2f5",
  secondary: "#fafad2",
};

function getBackgroundColor(mode: ButtonProps["mode"]) {
  return (mode && backgroundColor[mode]) || "#fff";
}
