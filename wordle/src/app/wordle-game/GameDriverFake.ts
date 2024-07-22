import { IGameDriver } from "../models/IGameDriver";
import { WordleHtmlGridPresenter } from "../models/WordleHtmlGridPresenter";
import { WordleLine } from "../models/WordleLine";

export class GameDriverFake implements IGameDriver<WordleLine[]> {
  // propose<T>(proposeWord: string): T {
  //   throw new Error("Method not implemented.");
  // }
  constructor(private presenter: WordleHtmlGridPresenter) {}
  propose<WordleLine>(proposeWord: string): WordleLine {
    throw new Error("Method not implemented.");
  }
  public assert = { mot: "", nbEssais: 0 };
  public countCall = 0;
  createGame(mot: string, nbEssais: number): WordleLine[] {
    this.assert.mot = mot;
    this.assert.nbEssais = nbEssais;
    this.countCall++;
    this.presenter.presentData({
      data: [],
      motATrouver: mot,
      nombreEssais: 5,
      actualEssais: 0
    });
    return this.presenter.view().data;
  }
}
