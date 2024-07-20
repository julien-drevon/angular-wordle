import { ComponentFixture, TestBed } from "@angular/core/testing";

import {IGameProvider,
  WordleGameComponent,
  WordleGameViewModel
} from "./wordle-game.component";
import { WordleState } from "../../view/wordleState";

describe("WordleGameComponent", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleGameComponent],
      providers: [
        { provide: WordleGameViewModel, useClass: WordleGameViewModel }
        //  {provide : "IGameProvider", useClass: GameProviderFake}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WordleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Je veux creer un jeux de wordle de n lignes ", () => {
    // component.setViewModel(new WordleGameViewModel(new GameProviderFake0()));
    component.startNewGame(5);
    expect(component.Grille).toHaveLength(5);

    component.startNewGame(4);
    expect(component.Grille).toHaveLength(4);
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter ", () => {
    component.startNewGame(1);
    expect(component.Grille[0].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(component.Grille[0].letters[4]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
  });

  // it("Je veux creer un jeux de wordle pour trouver OCTO1", () => {
  //   component.setViewModel(new WordleGameViewModel(new GameProviderFake1()));
  //   component.startNewGame(5, "OCTO!");

  //   component.propose("C!TO1");
  //   //component.grille[0]
  // });
});
class GameProviderFake implements IGameProvider {
  createGame(mot: string, nbEssais: number): void {}
}
