import { Inject } from "@angular/core";
import { WordleLine } from "./WordleLine";
import { IGameDriver } from "./IGameDriver";

const NOMBRE_ESSAIS = 5;
export class WordleGameViewModel {

  constructor(
    @Inject("IGameProvider") private _gameProvider: IGameDriver<WordleLine[]>
  ) {}
  private _grille: WordleLine[] = [];
  private _status = GameStatus.Init;

  get grille(): WordleLine[] {
    return this._grille;
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

  initGame(motATrouver: string, nombreEssais = 5): void {
    this._grille = this._gameProvider.createGame(motATrouver, nombreEssais);
    this._status = GameStatus.Start;
  }

  propose(proposeWord: string) {
    this._grille = this._gameProvider.propose(proposeWord);
    if (this._grille.some((x) => x.isGoodWord())) this._status = GameStatus.Win;
  }
    restart() {
    this._grille =  this._gameProvider.restart();
    this._status = GameStatus.Init;
  }
}

export enum GameStatus {
  Init = 0,
  Start = 1,
  Win = 2
}
