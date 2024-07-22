import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WordleGameComponent } from "./wordle-game.component";
import { WordleGameViewModel } from "../models/WordleGameViewModel";
import { WordleHtmlGridPresenter } from "../models/WordleHtmlGridPresenter";
import { By } from "@angular/platform-browser";
import { WordleState } from "../models/wordleState";
import { FormsModule } from "@angular/forms";
import { WordleGameResult } from "../models/WordleGameResult";
import { GameDriverFake } from "./GameDriverFake";

describe("WordleGameComponent", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;
  let myFakeDriver: GameDriverFake;
  let wordleGameViewModel: WordleGameViewModel;

  beforeEach(async () => {
    myFakeDriver = new GameDriverFake(new WordleHtmlGridPresenter());
    wordleGameViewModel = new WordleGameViewModel(myFakeDriver);

    await TestBed.configureTestingModule({
      imports: [WordleGameComponent, FormsModule],
      providers: [
        { provide: WordleGameViewModel, useFactory: () => wordleGameViewModel }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WordleGameComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Je veux creer un jeux de wordle de n lignes ", () => {
    wordleGameViewModel.initGame("TESTA");
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);

    wordleGameViewModel.initGame("TEST");
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter ", () => {
    wordleGameViewModel.initGame("A");
    fixture.detectChanges();
    expect(component.grille[0].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
    expect(component.grille[4].letters[0]).toEqual({
      value: "?",
      state: WordleState.NoLettter
    });
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter et s'afficher", () => {
    wordleGameViewModel.initGame("DE");
    fixture.detectChanges();
    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(textDesLignes.length).toBe(10);
  });

  it("je fais une game", () => {
    expect(fixture.nativeElement.querySelector("#startButton")).toBeFalsy();

    component.initWord = "OCTO!";
    fixture.detectChanges();

    const initButton = fixture.debugElement.query(
      By.css("#configureButton")
    ).nativeElement;
    initButton.click();
    fixture.detectChanges();

    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(
      fixture.nativeElement.querySelector(".wordle-game-start")
    ).toBeFalsy();
    expect(textDesLignes.length).toBe(25);
    expect(myFakeDriver.assert).toEqual({ mot: "OCTO!", nbEssais: 5 });
    expect(myFakeDriver.countCall).toBe(1);

    expect(
      fixture.nativeElement.querySelector(".wordle-game-propose")
    ).toBeTruthy();

    component.proposeWord = "42COT";
    fixture.detectChanges();
    const startButton = fixture.debugElement.query(
      By.css("#startButton")
    ).nativeElement;
    startButton.click();
    fixture.detectChanges();

    //   expect(component.grille[0].letters).toEqual([
    //      {      value: "4",      state: WordleState.bad    }
    //     ,{      value: "2",      state: WordleState.bad    }
    //     ,{      value: "C",      state: WordleState.placement    }
    //     ,{      value: "O",      state: WordleState.good    }
    //     ,{      value: "T",      state: WordleState.bad    }]);
  });
});
