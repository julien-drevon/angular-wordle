import { IMOutPresenter, PresentData } from "./IGameDriver";
import { WordleGameResult } from "./WordleGameResult";
import { WordleLetter } from "./WordleLetter";
import { WordleLine } from "./WordleLine";
import { WordleState } from "./wordleState";

export class WordleFakePresenter implements IMOutPresenter<WordleLine[]> {
  _result: WordleGameResult = {
    data: [],
    motATrouver: "",
    nombreEssais: 5,
    actualEssais: 0
  };

  _grille: WordleLine[] = [];

  view(): PresentData<WordleLine[]> {
    if (this._result.actualEssais < 1) {
      this._grille = createStartGille(this._result);
    } else {
      const index = this._result.actualEssais - 1;
      this._grille[index] = this._result.data[index];
    }

    return { data: this._grille, error: "" };
  }

  public presentData(result: WordleGameResult): void {
    this._result = result;
  }
}

function createStartWordleLine(lengthOfWord: number): WordleLetter[] {
  const line = [];
  for (let i = 0; i < lengthOfWord; i++) {
    line.push(new WordleLetter("?", WordleState.NoLettter));
  }
  return line;
}

function createStartGille(result: WordleGameResult): WordleLine[] {
  const newGrille: WordleLine[] = [];
  for (let i = 0; i < result.nombreEssais; i++) {
    newGrille[i] = new WordleLine(
      createStartWordleLine(result.motATrouver.length)
    );
  }
  return newGrille;
}
