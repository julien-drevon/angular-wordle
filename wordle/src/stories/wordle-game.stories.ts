import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { WordleGameComponent } from "../app/wordle-game/wordle-game.component";
import { WordleGameViewModel } from "../app/models/WordleGameViewModel";
import { WordleFakePresenter } from "../app/presenters/WordleFakePresenter";
import { Game2CoupsGagnantDriverFake } from "../app/wordle-game/Game2CoupsGagnantDriverFake";
import { Game1CoupPerdantDriverFake } from "../app/wordle-game/Game1CoupPerdantDriverFake";
import { createWordleEngineAdapter, WordleGameEnginePresenter } from "../app/presenters/WordleGameEnginePresenter";
import { WordleAdapter } from "../app/presenters/WordleAdapter";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WordleGameComponent> = {
  title: "Example/wordle-game",
  component: WordleGameComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      //import:[WordleGameComponent],     
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




export default meta;
type Story = StoryObj<WordleGameComponent>;

export const partieAvecUnVraiAdapterExemple: Story = {
  decorators: [
    moduleMetadata({
      //import:[WordleGameComponent],
      providers: [
        {
          provide: WordleGameViewModel,
          useFactory: () => createGagnantViewModel()
        }
      ]
    })
  ],
  args: {
    //_viewModel: createViewModel()
  }
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const partieGagnanteMot5LettresEn2CoupsExemple: Story = {
  decorators: [
    moduleMetadata({
      //import:[WordleGameComponent],
      providers: [
        {
          provide: WordleGameViewModel,
          useFactory: () => createGagnantViewModel()
        }
      ]
    })
  ],
  args: {
    //_viewModel: createViewModel()
  }
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const partiePerdanteMot1LettreEn1CoupExemple: Story = {
  decorators: [
    moduleMetadata({
      //import:[WordleGameComponent],
      providers: [
        { provide: WordleGameViewModel, useFactory: createPerdantViewModel }
      ]
    })
  ],
  args: {
    //_viewModel: createViewModel()
  }
};

function createGagnantViewModel() {
  const vm = new WordleGameViewModel(
    new Game2CoupsGagnantDriverFake(new WordleFakePresenter())
  );
  return vm;
}
function createPerdantViewModel() {
  const vm = new WordleGameViewModel(
    new Game1CoupPerdantDriverFake(new WordleFakePresenter())
  );
  vm.nombreEssais = 1;
  return vm;
}
