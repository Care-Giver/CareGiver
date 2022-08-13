import * as React from "react" import { storiesOf } from "@storybook/react-native" import {
StoryScreen, Story, UseCase } from "#storybook/views" import { color } from "@theme/index" import {
Test } from "./test" storiesOf("Test", module) .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
.add("Style Presets", () => (
<Story>
  <UseCase text="Primary" usage="The primary.">
    <Test style={{ backgroundColor: color.error }} />
  </UseCase>
</Story>
))
