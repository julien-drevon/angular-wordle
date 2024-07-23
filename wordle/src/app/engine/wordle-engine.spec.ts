import { WordleLetter } from "../models/WordleLetter";
import { WordleState } from "../models/wordleState";
describe("WordleEngine", () => {
  it("je joue une game de 1 lettre gagnate", () => {
    const engine = new WordleGame("O", 5);
    expect(engine.propose("4")).toEqual({
      grid: [new WordleLetter("4", WordleState.bad)]
    });
    expect(engine.propose("O")).toEqual({
      grid: [new WordleLetter("O", WordleState.good)]
    });
  });
});

export class WordleGame {
  propose(proposition: string): any {
    const gridToReturn: WordleLetter[] = [];
    this.parcourirPourPlacerLesGoods(gridToReturn, proposition);
    return { grid: gridToReturn };
  }

  private parcourirPourPlacerLesGoods(
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

  constructor(
    private _motATrouver: string,
    private _nombreEssais: number
  ) {}
}
