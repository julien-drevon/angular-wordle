describe("WordleEngine", () => {
  it("je joue une game de 1 lettre gagnate", () => {
    const engine = new WordleGame("O", 5);
    expect(engine.propose("4")).toEqual({
      grid: [new WordleResultLetter("4", WordleResultState.bad)],
      essais: 4,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
    expect(engine.propose("O")).toEqual({
      grid: [new WordleResultLetter("O", WordleResultState.good)],
      essais: 3,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
  });
  it("je joue une game de 2 lettres gagnate", () => {
    const engine = new WordleGame("42", 5);
    expect(engine.propose("O4")).toEqual({
      grid: [
        new WordleResultLetter("O", WordleResultState.bad),
        new WordleResultLetter("4", WordleResultState.placement)
      ],
      essais: 4,
      tailleMotATrouver: 2,
      nombreEssais: 5
    });
  });
});

export class WordleEngineResult {
  constructor(
    public grid: WordleResultLetter[],
    public essais: number,
    public tailleMotATrouver: number,
    public nombreEssais: number
  ) {}
}

export enum WordleResultState {
  good,
  bad,
  placement
}
export class WordleResultLetter {
  constructor(
    public value: string,
    public state: WordleResultState
  ) {
    this.value = value;
    this.state = state;
  }
}

export class WordleGame {
  propose(proposition: string): WordleEngineResult {
    const gridToReturn = this.parcourirPourPlacerLesGoodsEtMettreLesBads(proposition);
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
        if (this._motATrouver.search(res.value) != -1) {
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
