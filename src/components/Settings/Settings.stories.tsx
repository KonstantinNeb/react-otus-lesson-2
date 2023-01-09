import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Settings from "./Settings";
import { GameSettings, Mode } from "../../types";

export default {
  title: "Game_of_life/Settings",
  component: Settings,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 250,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => (
  <Settings {...args} />
);

export const SettingsDefault = Template;

const initialGameSettings: GameSettings = {
  boardSize: { x: 50, y: 50 },
  boardFillPercent: 15,
  speed: 3,
};

SettingsDefault.args = {
  mode: Mode.STOP,
  onChangeSettings: () => null,
  onPause: () => null,
  onReStart: () => null,
  onStart: () => null,
  settings: initialGameSettings,
};
