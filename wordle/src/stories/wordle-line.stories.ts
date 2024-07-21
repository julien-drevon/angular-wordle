import type { Meta, StoryObj } from "@storybook/angular";

import { WordleLineComponent } from "../app/wordle-line/wordle-line.component";
import { WordleLine } from "../app/models/WordleLine";
import { WordleState } from "../app/models/wordleState";
import { WordleLetter } from "../app/models/WordleLetter";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WordleLineComponent> = {
  title: "Example/wordle-line",
  component: WordleLineComponent,
  tags: ["autodocs"],
  args: {
    line: new WordleLine()
  },
  parameters: {
    viewports: {
      styles: {
        height: "800px"
      }
    }
  }
};

export default meta;
type Story = StoryObj<WordleLineComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const simpleExemple: Story = {
  args: {
    line: new WordleLine([
      new WordleLetter("T", WordleState.placement),
      new WordleLetter("C", WordleState.good),
      new WordleLetter("D", WordleState.bad),
      new WordleLetter("O", WordleState.good)
    ])
  }
};
export const goodLineExemple: Story = {
  args: {
    line: new WordleLine([
      new WordleLetter("O", WordleState.good),
      new WordleLetter("C", WordleState.good),
      new WordleLetter("T", WordleState.good),
      new WordleLetter("O", WordleState.good)
    ])
  }
};
export const defaultLineExemple: Story = {
  args: {
    line: new WordleLine([
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter)
    ])
  }
};