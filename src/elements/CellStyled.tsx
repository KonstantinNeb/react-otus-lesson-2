import styled from "styled-components";
import { CellState } from "../types";

interface CellStyledProps {
  cellSize: number;
  cellData: CellState;
}

export const CellStyled = styled.div<CellStyledProps>`
  background-color: ${({ cellData }) => (cellData ? "#3d56b3" : "#fafad2")};
  width: ${({ cellSize }) => cellSize}px;
  height: ${({ cellSize }) => cellSize}px;
  border: 1px solid #c0c3d1;
  box-sizing: border-box;

  &:hover {
    border: 2px solid black;
  }
`;
