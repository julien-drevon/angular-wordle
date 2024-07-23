import { IGameDriver } from "../models/IGameDriver";

import { WordleFakePresenter } from "../models/WordleHtmlGridPresenter";
import { WordleLetter } from "../models/WordleLetter";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";

export class GameDriverFake implements IGameDriver<WordleLine[]> {
  constructor(private presenter: WordleFakePresenter) {}

  propose(proposeWord: string): WordleLine[] {
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
    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }

  public assert = {
    data: [] as WordleLine[],
    motATrouver: "",
    nombreEssais: 0,
    actualEssais: 0
  };
  public countCall = 0;
  createGame(mot: string, nbEssais: number): WordleLine[] {
    this.assert.motATrouver = mot;
    this.assert.nombreEssais = nbEssais;
    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }
}
