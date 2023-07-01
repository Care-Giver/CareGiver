import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { color } from "#theme"
import { CustomInputModal } from "./custom-input-modal"

storiesOf("CustomInputModal", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CustomInputModal style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
