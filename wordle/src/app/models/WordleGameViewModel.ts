import { Inject } from "@angular/core";
import { WordleLine } from "./WordleLine";
import { IGameDriver } from "./IGameDriver";
import { WordleGameResult } from "./WordleGameResult";

const NOMBRE_ESSAIS = 5;
export class WordleGameViewModel {
  constructor(
    @Inject("IGameProvider")
    private _gameProvider: IGameDriver<WordleGameResult>
  ) { }
  //private _grille: WordleLine[] = [];
  private _status = GameStatus.Init;
  public nombreEssais = 5;

  private _result: WordleGameResult = {
    actualEssais: 0,
    lengthOfWord: 5,
    data: [],
    nombreEssais: this.nombreEssais
  };

  get lengthOfWord() {
    return this._result.lengthOfWord;
  }

  get grille(): WordleLine[] {
    return this._result.data;
  }

  get isInit() {
    return this._status === GameStatus.Init;
  }

  get isStarted() {
    return this._status === GameStatus.Start;
  }

  get isWin() {
    return this._status === GameStatus.Win;
  }

  get isLoose() {
    return this._status === GameStatus.Loose;
  }

  initGame(): void {
    this._result = this._gameProvider.createGame(
      this.nombreEssais
    );
    this._status = GameStatus.Start;
  }

  propose(proposeWord: string) {
    this._result = this._gameProvider.propose(proposeWord);
    this.testIfWinOrLoose();
  }

  private testIfWinOrLoose() {
    if (this._result.data.some((x) => x.isGoodWord())) {
      this._status = GameStatus.Win;
    }
    if (
      this._result.actualEssais === this._result.nombreEssais &&
      this._status != GameStatus.Win
    ) {
      this._status = GameStatus.Loose;
    }
  }

  restart() {
    this._result = this._gameProvider.restart();
    this._status = GameStatus.Init;
  }
}

export enum GameStatus {
  Init = 0,
  Start = 1,
  Win = 2,
  Loose = 3
}
