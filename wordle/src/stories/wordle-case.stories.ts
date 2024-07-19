import type { Meta, StoryObj } from '@storybook/angular';
import { WordleCaseComponent } from "../app/wordle-case/wordle-case.component";
import { WordleState } from "../view/wordleState";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WordleCaseComponent> = {
  title: 'Example/wordle-case',
  component: WordleCaseComponent,
  tags: ['autodocs'], 
  args:{
  letter:"A",
  state:WordleState.good
  }
  ,  
};

export default meta;
type Story = StoryObj<WordleCaseComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const goodLetter: Story = {
  args: {
  letter:"A",
  state:WordleState.good
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
