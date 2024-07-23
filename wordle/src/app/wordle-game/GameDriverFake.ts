import { IGameDriver } from "../models/IGameDriver";
import { WordleFakePresenter } from "../models/WordleFakePresenter";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";

export class GameDriverFake implements IGameDriver<WordleLine[]> {
  constructor(private presenter: WordleFakePresenter) { }
  restart(): WordleLine[] {
    this.assert = {
      data: [] as WordleLine[],
      motATrouver: "",
      nombreEssais: 0,
      actualEssais: 0
    };

    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
    
  }

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
    motATrouver: "",
    nombreEssais: 0,
    actualEssais: 0
  };

  createGame(mot: string, nbEssais: number): WordleLine[] {
    this.assert.motATrouver = mot;
    this.assert.nombreEssais = nbEssais;
    this.presenter.presentData(this.assert);
    return this.presenter.view().data;
  }
}
