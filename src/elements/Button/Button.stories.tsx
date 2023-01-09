import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Game_of_life/Elements/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Label</Button>
);

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  mode: "primary",
};

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
  mode: "secondary",
};

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {};
