import React, { FC, memo } from "react";
import { FlexBox } from "../FlexBox";

import styled from "styled-components";

interface InputRangePropsType {
  value: number | undefined;
  [key: string]: unknown;
}

export const Input = styled.input<InputRangePropsType>`
-webkit-appearance: none;
width: 150px;
height: 8px;
margin-right: 10px;
border-radius: 6px;
outline: 0;
background: #ebf2f5;
}

&::-webkit-slider-thumb, -moz-range-thumb, -ms-thumb {
-webkit-appearance: none;
height: 18px;
width: 18px;
border-radius: 3px;
background: #3d56b3;
border-radius: 50%;
border: 0;
cursor: pointer;
}
`;

const InputRange: FC<InputRangePropsType> = memo((props) => {
  return (
    <FlexBox alignItems={"center"}>
      <Input type="range" {...props}></Input>
      <span>{props.value}</span>
    </FlexBox>
  );
});

export default InputRange;
