import { IGameDriver } from "../models/IGameDriver";
import { WordleGameResult } from "../models/WordleGameResult";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";
import { IMPresenter } from "../clean-archi/IMPresenter";

export class Game2CoupsGagnantDriverFake
  implements IGameDriver<WordleGameResult>
{
  constructor(
    private presenter: IMPresenter<WordleGameResult, WordleGameResult>
  ) {}

  public MotATrouver = "OCTO!";
  restart(): WordleGameResult {
    this.assert = {
      data: [] as WordleLine[],
      lengthOfWord: 5,
      nombreEssais: 5,
      actualEssais: 0
    };

    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }

  propose(proposeWord: string): WordleGameResult {
    this.assert.actualEssais++;

    if (this.assert.actualEssais == 1) {
      this.assert.data.push(
        new WordleLine([
          { value: "4", state: WordleState.bad },
          { value: "2", state: WordleState.bad },
          { value: "C", state: WordleState.placement },
          { value: "O", state: WordleState.good },
          { value: "T", state: WordleState.bad }
        ])
      );
    }
    if (this.assert.actualEssais == 2) {
      this.assert.data.push(
        new WordleLine([
          { value: "O", state: WordleState.good },
          { value: "C", state: WordleState.good },
          { value: "T", state: WordleState.good },
          { value: "O", state: WordleState.good },
          { value: "!", state: WordleState.good }
        ])
      );
    }

    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }

  public assert = {
    data: [] as WordleLine[],
    lengthOfWord: 5,
    nombreEssais: 5,
    actualEssais: 0
  };

  createGame(nbEssais: number): WordleGameResult {
    this.assert.lengthOfWord = this.MotATrouver.length;
    this.assert.nombreEssais = nbEssais;
    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }
}
