import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Board from "./Board";

export default {
  title: "Game_of_life/Board",
  component: Board,
} as ComponentMeta<typeof Board>;

const Template: ComponentStory<typeof Board> = (args) => <Board {...args} />;

export const BoardDefault = Template;

BoardDefault.args = {
  boardSize: { x: 5, y: 5 },
  cellsData: [
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
  ],
};
