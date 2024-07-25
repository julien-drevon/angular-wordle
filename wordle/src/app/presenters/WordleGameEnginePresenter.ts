import { WordleEngineResult } from "../engine/WordleEngineResult";
import { WordleResultLetter } from "../engine/WordleResultLetter";
import { WordleResultState } from "../engine/WordleResultState";
import { WordleGameResult } from "../models/WordleGameResult";
import { WordleLetter } from "../models/WordleLetter";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";
import { WordleAbstractPresenter } from "./WordleAbstractPresenter";
import { WordleAdapter } from "./WordleAdapter";

export class WordleGameEnginePresenter extends WordleAbstractPresenter<WordleEngineResult> {
  private _grid = [] as WordleResultLetter[][];

  public override convertTinToWordleGameResult(
    result: WordleEngineResult
  ): WordleGameResult {
    if (result.grid.length === 0) {
      this._grid = [];
    } else {
      this._grid.push(result.grid);
    }

    return {
      data: this._grid.map(
        (line) =>
          new WordleLine(
            line.map(
              (letter) =>
                new WordleLetter(letter.value, convertState(letter.state))
            )
          )
      ),
      lengthOfWord: result.tailleMotATrouver,
      actualEssais: result.nombreEssais - result.essaisRestant,
      nombreEssais: 5
    };
  }
}
export const convertState = (state: WordleResultState) => {
  switch (state) {
    case WordleResultState.bad:
      return WordleState.bad;
    case WordleResultState.good:
      return WordleState.good;
    case WordleResultState.placement:
      return WordleState.placement;
    default:
      return WordleState.NoLettter;
  }
};

export const createWordleEngineAdapter =  new WordleAdapter(new WordleGameEnginePresenter());