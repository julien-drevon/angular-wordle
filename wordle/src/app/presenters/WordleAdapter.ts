import { IMPresenter } from "../clean-archi/IMPresenter";
import { WordleEngineResult } from "../engine/WordleEngineResult";
import { WordleGame } from "../engine/WordleGame";
import { WordleResultLetter } from "../engine/WordleResultLetter";
import { IGameDriver } from "../models/IGameDriver";

export class WordleAdapter<TOut> implements IGameDriver<TOut> {
  private _game: WordleGame | null = null;
  private _grid = [] as WordleResultLetter[][];
  constructor(private presenter: IMPresenter<WordleEngineResult, TOut>) {}

  propose(proposeWord: string): TOut {
    this.presenter.presentData(this._game!.propose(proposeWord));
    return this.presenter.view().data;
  }
  createGame(nbEssais: number): TOut {
    this._grid = [];
    this._game = new WordleGame("CRAFTS");
    this.presenter.presentData({
      grid: [],
      essaisRestant: 5,
      tailleMotATrouver: 6,
      nombreEssais: 5
    });
    return this.presenter.view().data;
  }
  restart(): TOut {
    this._grid = [];
    this._game = null;
    this.presenter.presentData({
      grid: [],
      essaisRestant: 5,
      tailleMotATrouver: 6,
      nombreEssais: 5
    });
    return this.presenter.view().data;
  }
}
