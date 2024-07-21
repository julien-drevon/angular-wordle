import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { WordleGameComponent } from "../app/wordle-game/wordle-game.component";
import { WordleGameViewModel } from "../app/models/WordleGameViewModel";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WordleGameComponent> = {
  title: "Example/wordle-game",
  component: WordleGameComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      //import:[WordleGameComponent],
      providers: [
        {
          provide: WordleGameViewModel,
          useFactory: createDefaultViewModel
        }
      ]
    })
  ],
  args: {
    //_viewModel: createViewModel()
  },
  parameters: {
    viewports: {
      styles: {
        height: "800px"
      }
    }
  }
};

function createDefaultViewModel() {
  const vm = new WordleGameViewModel();
  vm.createGrille(5);
  return vm;
}

export default meta;
type Story = StoryObj<WordleGameComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const simpleExemple: Story = {
  // decorators: [
  //   moduleMetadata({
  //     //import:[WordleGameComponent],
  //     providers: [
  //       { provide: WordleGameViewModel, useFactory: () => createDefaultViewModel() }
  //     ]
  //   })
  // ],
  args: {
    //_viewModel: createViewModel()
  }
};
