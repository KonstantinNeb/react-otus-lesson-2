import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Cell from "./Cell";
import { CELL_STATE_EMPTY, CELL_STATE_ALIVE } from "../../constants";

export default {
  title: "Game_of_life/Cell",
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const CellAlive = Template.bind({});
CellAlive.args = {
  cellData: CELL_STATE_ALIVE,
};

export const CellEmpty = Template.bind({});
CellEmpty.args = {
  cellData: CELL_STATE_EMPTY,
};
