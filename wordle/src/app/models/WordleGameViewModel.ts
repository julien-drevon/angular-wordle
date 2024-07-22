import { Inject } from "@angular/core";
import { WordleLetter } from "./WordleLetter";
import { WordleLine } from "./WordleLine";
import { WordleState } from "./wordleState";
import { IGameDriver } from "./IGameDriver";

const NOMBRE_ESSAIS = 5;
export class WordleGameViewModel {
  constructor(@Inject("IGameProvider") private _gameProvider: IGameDriver) {}
  private _grille: WordleLine[] = [];
  private _isRunning=false;

  get grille(): WordleLine[] {
    return this._grille;
  }

  get isRunning():boolean{
    return this._isRunning;
  }

  startGame(motATrouver: string, nombreEssais = 5): void {
    this._grille = this.createGille(motATrouver, nombreEssais);
    this._gameProvider.createGame(motATrouver, nombreEssais);
    this._isRunning=true;
  }

  createGille(motATrouver: string, nombreEssais = 5): WordleLine[] {
    const newGrille: WordleLine[] = [];
    for (let i = 0; i < nombreEssais; i++) {
      newGrille[i] = new WordleLine(
        this.createDefautWordleLine(motATrouver.length)
      );
    }
    return newGrille;
  }

  private createDefautWordleLine(lengthOfWord: number): WordleLetter[] {
    const line = [];
    for (let i = 0; i < lengthOfWord; i++) {
      line.push(new WordleLetter("?", WordleState.NoLettter));
    }
    return line;
  }
}
