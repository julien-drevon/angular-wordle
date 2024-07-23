import { IGameDriver } from "../models/IGameDriver";
import { WordleFakePresenter } from "../models/WordleFakePresenter";
import { WordleGameResult } from "../models/WordleGameResult";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";

export class Game1CoupPerdantDriverFake
  implements IGameDriver<WordleGameResult>
{
  constructor(private presenter: WordleFakePresenter) {}

  restart(): WordleGameResult {
    this.assert = {
      data: [] as WordleLine[],
      lengthOfWord: 1,
      nombreEssais: 1,
      actualEssais: 0
    };

    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }

  propose(proposeWord: string): WordleGameResult {
    this.assert.actualEssais++;

    if (this.assert.actualEssais == 1) {
      this.assert.data.push(
        new WordleLine([{ value: "A", state: WordleState.bad }])
      );
    }

    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }

  public assert = {
    data: [] as WordleLine[],
    lengthOfWord: 1,
    nombreEssais: 1,
    actualEssais: 0
  };

  createGame(nbEssais: number): WordleGameResult {
    this.assert.lengthOfWord = 1;
    this.assert.nombreEssais = nbEssais;
    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }
}
