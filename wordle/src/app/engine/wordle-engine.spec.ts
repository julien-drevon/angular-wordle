import { WordleGame } from "./WordleGame";
import { WordleResultLetter } from "./WordleResultLetter";
import { WordleResultState } from "./WordleResultState";

describe("WordleGame", () => {
  it("je joue une game de 1 lettre gagnate", () => {
    const engine = new WordleGame("O");
    expect(engine.propose("4")).toEqual({
      grid: [new WordleResultLetter("4", WordleResultState.bad)],
      essaisRestant: 4,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
    expect(engine.propose("O")).toEqual({
      grid: [new WordleResultLetter("O", WordleResultState.good)],
      essaisRestant: 3,
      tailleMotATrouver: 1,
      nombreEssais: 5
    });
  });
  it("je joue une game de 2 lettres gagnate", () => {
    const engine = new WordleGame("42");
    expect(engine.propose("O4")).toEqual({
      grid: [
        new WordleResultLetter("O", WordleResultState.bad),
        new WordleResultLetter("4", WordleResultState.placement)
      ],
      essaisRestant: 4,
      tailleMotATrouver: 2,
      nombreEssais: 5
    });
  });
});
