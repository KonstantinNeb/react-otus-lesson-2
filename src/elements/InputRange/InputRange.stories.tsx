import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import InputRange from "./InputRange";

export default {
  title: "Game_of_life/Elements/InputRange",
  component: InputRange,
} as ComponentMeta<typeof InputRange>;

const Template: ComponentStory<typeof InputRange> = (args) => (
  <InputRange {...args} />
);

export const InputRangeDefault = Template;
InputRangeDefault.args = {
  value: 50,
};
