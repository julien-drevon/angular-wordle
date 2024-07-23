import { WordleLetter } from "../models/WordleLetter";
import { WordleState } from "../models/wordleState";
describe("WordleEngine", () => {
  it("je joue une game de 1 lettre gagnate", () => {
    const engine = new WordleGame("O", 5);
    expect(engine.propose("4")).toEqual({
      grid: [new WordleLetter("4", WordleState.bad)],
      essais: 4,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
    expect(engine.propose("O")).toEqual({
      grid: [new WordleLetter("O", WordleState.good)],
      essais: 3,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
  });
});

export class WordleGame {
  propose(proposition: string): any {
    const gridToReturn: WordleLetter[] = [];
    this.parcourirPourPlacerLesGoodsEtMettreLesBads(gridToReturn, proposition);
    return {
      grid: gridToReturn,
      essais: --this._nombreEssaisRestant,
      tailleMotATrouver: this._motATrouver.length,
      nombreEssais: this._nombreEssais
    };
  }

  private parcourirPourPlacerLesGoodsEtMettreLesBads(
    gridToReturn: WordleLetter[],
    proposition: string
  ) {
    for (let i = 0; i < this._motATrouver.length; i++) {
      gridToReturn[i] = new WordleLetter(
        proposition[i],
        this.isGoodPlacement(proposition, i)
      );
    }
  }

  private isGoodPlacement(proposition: string, index: number) {
    return proposition[index] === this._motATrouver[index]
      ? WordleState.good
      : WordleState.bad;
  }
  private _nombreEssaisRestant: number;
  constructor(
    private _motATrouver: string,
    private _nombreEssais: number
  ) {
    this._nombreEssaisRestant = this._nombreEssais;
  }
}
