import { BoardSize } from "../types";
import styled from "styled-components";

interface BoardStyledProps {
  boardSize: BoardSize;
  cellSize: number;
}

export const BoardStyled = styled.div<BoardStyledProps>`
  width: ${({ boardSize: { x }, cellSize }) => x * cellSize}px;
  height: ${({ boardSize: { y }, cellSize }) => y * cellSize}px;
`;
