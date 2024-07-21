import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WordleGameComponent } from "./wordle-game.component";
import { WordleGameViewModel } from "../models/WordleGameViewModel";
import { IGameProvider } from "../models/IGameProvider";
import { Injectable } from "@angular/core";
import { By } from "@angular/platform-browser";
import { WordleState } from "../models/wordleState";

describe("WordleGameComponent", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleGameComponent],
      providers: [
        { provide: WordleGameViewModel, useClass: WordleGameViewModel },
        { provide: "IGameProvider", useClass: GameProviderFake }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WordleGameComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Je veux creer un jeux de wordle de n lignes ", () => {
    component.startNewGame(5);
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);

    component.startNewGame(4);
    fixture.detectChanges();
    expect(component.grille).toHaveLength(4);
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter ", () => {
    component.startNewGame(1);
    fixture.detectChanges();
    expect(component.grille[0].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(component.grille[0].letters[4]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
  });
  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter et s'afficher", () => {
    component.startNewGame(2);
    fixture.detectChanges();
    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(textDesLignes.length).toBe(10);
  });
});

@Injectable()
export class GameProviderFake implements IGameProvider {
  createGame(mot: string, nbEssais: number): void {}
}
