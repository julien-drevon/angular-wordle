import { WordleEngineResult } from "./WordleEngineResult";
import { WordleResultLetter } from "./WordleResultLetter";
import { WordleResultState } from "./WordleResultState";

export class WordleGame {
  propose(proposition: string): WordleEngineResult {
    const gridToReturn =
      this.parcourirPourPlacerLesGoodsEtMettreLesBads(proposition);
    this.parcourirLaGridPourModifierLesBadEnPlacement(gridToReturn);
    return {
      grid: gridToReturn,
      essais: --this._nombreEssaisRestant,
      tailleMotATrouver: this._motATrouver.length,
      nombreEssais: this._nombreEssais
    };
  }

  private parcourirLaGridPourModifierLesBadEnPlacement(
    gridToReturn: WordleResultLetter[]
  ) {
    for (let res of gridToReturn) {
      if (res.state != WordleResultState.good) {
        if (this._motATrouver.search(res.value) !== -1) {
          res.state = WordleResultState.placement;
        }
      }
    }
  }

  private parcourirPourPlacerLesGoodsEtMettreLesBads(
    proposition: string
  ): WordleResultLetter[] {
    const gridToReturn: WordleResultLetter[] = [];
    for (let i = 0; i < this._motATrouver.length; i++) {
      gridToReturn[i] = new WordleResultLetter(
        proposition[i],
        this.isGoodPlacement(proposition, i)
      );
    }
    return gridToReturn;
  }

  private isGoodPlacement(proposition: string, index: number) {
    return proposition[index] === this._motATrouver[index]
      ? WordleResultState.good
      : WordleResultState.bad;
  }
  private _nombreEssaisRestant: number;
  constructor(
    private _motATrouver: string,
    private _nombreEssais: number
  ) {
    this._nombreEssaisRestant = this._nombreEssais;
  }
}
