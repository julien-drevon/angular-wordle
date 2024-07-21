import type { Meta, StoryObj } from "@storybook/angular";
import { WordleCaseComponent } from "../app/wordle-case/wordle-case.component";
import { WordleState } from "../app/models/wordleState";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WordleCaseComponent> = {
  title: "Example/wordle-case",
  component: WordleCaseComponent,
  tags: ["autodocs"],
  args: {
    letter: "A",
    state: WordleState.good
  }
};

export default meta;
type Story = StoryObj<WordleCaseComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const goodLetter: Story = {
  args: {
    letter: "A",
    state: WordleState.good
  }
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const badLetter: Story = {
  args: {
    letter: "A",
    state: WordleState.bad
  }
};

export const badPlacementLetter: Story = {
  args: {
    letter: "A",
    state: WordleState.placement
  }
};

export const noLetter: Story = {
  args: {
    letter: "?",
    state: WordleState.NoLettter
  }
};
