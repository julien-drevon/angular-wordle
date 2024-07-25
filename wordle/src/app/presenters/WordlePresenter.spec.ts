import { WordleState } from "../models/wordleState";
import { WordleAdapter } from "./WordleAdapter";
import { WordleGameEnginePresenter } from "./WordleGameEnginePresenter";



describe("Wordleadapter", () => {
  it("On va brancher l'adapter et faire le bon presenter pour notre besoin", () => {
    const addapter = new WordleAdapter(new WordleGameEnginePresenter());

    const startGrid = addapter.createGame(5);
    expect(startGrid.actualEssais).toEqual(0);
    expect(startGrid.nombreEssais).toEqual(5);
    expect(startGrid.lengthOfWord).toEqual("CRAFTS".length);
    expect(startGrid.data[0].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(startGrid.data[0].letters[5]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(startGrid.data[4].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(startGrid.data[4].letters[5]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });

    const firstGrid = addapter.propose("CRISEZ");
    expect(firstGrid.actualEssais).toEqual(1);
    expect(firstGrid.nombreEssais).toEqual(5);
    expect(firstGrid.lengthOfWord).toEqual("CRAFTS".length);
    expect(firstGrid.data[0].letters[0]).toEqual({
      value: "C",
      state: WordleState.good
    });
    expect(firstGrid.data[0].letters[1]).toEqual({
      value: "R",
      state: WordleState.good
    });
    expect(firstGrid.data[0].letters[2]).toEqual({
      value: "I",
      state: WordleState.bad
    });
    expect(firstGrid.data[0].letters[3]).toEqual({
      value: "S",
      state: WordleState.placement
    });
    expect(firstGrid.data[0].letters[4]).toEqual({
      value: "E",
      state: WordleState.bad
    });
    expect(firstGrid.data[0].letters[5]).toEqual({
      value: "Z",
      state: WordleState.bad
    });
  });
});
