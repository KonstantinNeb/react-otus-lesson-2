import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormLogin from "./FormLogin";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../state/store";

export default {
  title: "Game_of_life/FormLogin",
  component: FormLogin,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = () => <FormLogin />;

export const FormLoginDefault = Template;
