import { PresentData } from "../clean-archi/PresentData";
import { WordleGameResult } from "../models/WordleGameResult";
import { WordleLetter } from "../models/WordleLetter";
import { WordleLine } from "../models/WordleLine";
import { WordleState } from "../models/wordleState";
import { IMPresenter } from "../clean-archi/IMPresenter";

export abstract class WordleAbstractPresenter<TIn>
  implements IMPresenter<TIn, WordleGameResult> {
  _result: WordleGameResult = {
    data: [],
    lengthOfWord: 5,
    nombreEssais: 0,
    actualEssais: 0
  };

  _resultToDisplay: WordleGameResult = {
    data: [],
    lengthOfWord: 5,
    nombreEssais: 0,
    actualEssais: 0
  };

  view(): PresentData<WordleGameResult> {
    this.assignGrid();
    this.assignOtherResult();
    return { data: this._resultToDisplay, error: "" };
  }

  private assignGrid() {
    if (this._result.actualEssais < 1) {
      this._resultToDisplay.data = createStartGille(this._result);
    } else {
      const index = this._result.actualEssais - 1;
      this._resultToDisplay.data[index] = this._result.data[index];
    }
  }

  private assignOtherResult() {
    this._resultToDisplay.actualEssais = this._result.actualEssais;
    this._resultToDisplay.lengthOfWord = this._result.lengthOfWord;
    this._resultToDisplay.nombreEssais = this._result.nombreEssais;
  }

  public presentData(result: TIn): void {
    this._result = this.convertTinToWordleGameResult(result);
  }

  public abstract convertTinToWordleGameResult(result: TIn): WordleGameResult;
}

function createStartWordleLine(lengthOfWord: number): WordleLetter[] {
  const line = [];
  for (let i = 0; i < lengthOfWord; i++) {
    line.push(new WordleLetter("?", WordleState.NoLettter));
  }
  return line;
}

export function createStartGille(result: WordleGameResult): WordleLine[] {
  const newGrille: WordleLine[] = [];
  for (let i = 0; i < result.nombreEssais; i++) {
    newGrille[i] = new WordleLine(createStartWordleLine(result.lengthOfWord));
  }
  return newGrille;
}


