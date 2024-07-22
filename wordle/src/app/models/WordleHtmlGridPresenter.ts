import { IMOutPresenter, PresentData } from "./IGameDriver";
import { WordleGameResult } from "./WordleGameResult";
import { WordleLetter } from "./WordleLetter";
import { WordleLine } from "./WordleLine";
import { WordleState } from "./wordleState";

export class WordleHtmlGridPresenter implements IMOutPresenter<WordleLine[]> {
  _result: WordleGameResult = {
    data: [],
    motATrouver: "",
    nombreEssais: 5,
    actualEssais: 0
  };

  view(): PresentData<WordleLine[]> {
    if (this._result.actualEssais === 0) {
      return { data: createGille(this._result), error: "" };
    }
    return { data: [], error: "" };
  }

  public presentData(result: WordleGameResult): void {
    this._result = result;
  }
}

function createDefautWordleLine(lengthOfWord: number): WordleLetter[] {
  const line = [];
  for (let i = 0; i < lengthOfWord; i++) {
    line.push(new WordleLetter("?", WordleState.NoLettter));
  }
  return line;
}

function createGille(result: WordleGameResult): WordleLine[] {
  const newGrille: WordleLine[] = [];
  for (let i = 0; i < result.nombreEssais; i++) {
    newGrille[i] = new WordleLine(
      createDefautWordleLine(result.motATrouver.length)
    );
  }
  return newGrille;
}
