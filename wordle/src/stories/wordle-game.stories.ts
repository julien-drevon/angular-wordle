import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { WordleGameComponent } from "../app/wordle-game/wordle-game.component";
import { WordleGameViewModel } from "../app/models/WordleGameViewModel";
import { WordleFakePresenter } from "../app/models/WordleFakePresenter";
import { Game2CoupsGagnantDriverFake } from "../app/wordle-game/GameDriverFake";

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
  const vm = new WordleGameViewModel(
    new Game2CoupsGagnantDriverFake(new WordleFakePresenter())
  );
  return vm;
}

export default meta;
type Story = StoryObj<WordleGameComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const partieGagnateEn2CoupsExemple: Story = {
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
