import { WordleGame } from "./WordleGame";
import { WordleResultLetter } from "./WordleResultLetter";
import { WordleResultState } from "./WordleResultState";
import { IMOutPresenter } from "../clean-archi/IMOutPresenter";
import { IMInPresenter } from "../clean-archi/IMInPresenter";
import { WordleGameResult } from "../models/WordleGameResult";
import { WordleEngineResult } from "./WordleEngineResult";
import { PresentData } from "../clean-archi/PresentData";
import { IGameDriver } from "../models/IGameDriver";

describe("WordleGame", () => {
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

describe("Wordleadapter", () => {
  it("On va brancher l'adapter et faire le bon presenter pour notre besoin", () => {
    const addapter = new WordleAdapter(new PresenterPourWordleEngine());
  });
});

export class WordleAdapter<TOut> implements IGameDriver<TOut> {
  constructor(private presenter: IMOutPresenter<TOut>) {}

  propose(proposeWord: string): TOut {
    throw new Error("Method not implemented.");
  }
  createGame(nbEssais: number): TOut {
    throw new Error("Method not implemented.");
  }
  restart(): TOut {
    throw new Error("Method not implemented.");
  }
}

export class PresenterPourWordleEngine
  implements
    IMOutPresenter<WordleGameResult>,
    IMInPresenter<WordleEngineResult>
{
  view(): PresentData<WordleGameResult> {
    throw new Error("Method not implemented.");
  }
  presentData(data: WordleEngineResult): void {
    throw new Error("Method not implemented.");
  }
}
