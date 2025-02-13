import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WordleGameComponent } from "./wordle-game.component";
import { WordleGameViewModel } from "../models/WordleGameViewModel";
import { By } from "@angular/platform-browser";
import { WordleState } from "../models/wordleState";
import { FormsModule } from "@angular/forms";
import { Game2CoupsGagnantDriverFake } from "./Game2CoupsGagnantDriverFake";
import { Game1CoupPerdantDriverFake } from "./Game1CoupPerdantDriverFake";
import { WordleLine } from "../models/WordleLine";
import { createFakePresenter } from "../presenters/WordleDefaultPresenter";

describe("WordleGameComponent", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;
  let myFakeDriver: Game2CoupsGagnantDriverFake;
  let wordleGameViewModel: WordleGameViewModel;

  beforeEach(async () => {
    //myFakeDriver = new Game2CoupsGagnantDriverFake(new WordleFakePresenter());
    myFakeDriver = new Game2CoupsGagnantDriverFake(createFakePresenter());
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
    myFakeDriver.MotATrouver = "TESTA";
    wordleGameViewModel.initGame();
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);

    myFakeDriver.MotATrouver = "TEST";
    wordleGameViewModel.initGame();
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter ", () => {
    myFakeDriver.MotATrouver = "A";
    wordleGameViewModel.initGame();
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
    myFakeDriver.MotATrouver = "DE";
    wordleGameViewModel.initGame();
    fixture.detectChanges();
    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(textDesLignes.length).toBe(10);
  });
});

describe("Partie gagnante scenario", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;
  let myFakeDriver: Game2CoupsGagnantDriverFake;
  let wordleGameViewModel: WordleGameViewModel;

  beforeEach(async () => {
    //myFakeDriver = new Game2CoupsGagnantDriverFake(new WordleFakePresenter());
    myFakeDriver = new Game2CoupsGagnantDriverFake(createFakePresenter());
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
  
  it("je fais une game gagnante en 2 coups", () => {
    expect(fixture.nativeElement.querySelector("#startButton")).toBeFalsy();
    expect(myFakeDriver.assert.actualEssais).toBe(0);

    fixture.detectChanges();
    clickOnButton(fixture, "#configureButton");

    const casesDuWordle = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(
      fixture.nativeElement.querySelector(".wordle-game-start")
    ).toBeFalsy();
    expect(casesDuWordle.length).toBe(25);
    expect(myFakeDriver.assert).toEqual({
      data: [] as WordleLine[],
      lengthOfWord: 5,
      nombreEssais: 5,
      actualEssais: 0
    });

    expect(
      fixture.nativeElement.querySelector(".wordle-game-propose")
    ).toBeTruthy();

    component.proposeWord = "OCTO";
    expect(fixture.nativeElement.querySelector("#proposeButton")).toBeFalsy();

    //Premier Essais
    changeProposition("42COT", component, fixture);
    clickOnButton(fixture, "#proposeButton");

    expect(myFakeDriver.assert.actualEssais).toBe(1);

    expect(component.grille[0].letters).toEqual([
      { value: "4", state: WordleState.bad },
      { value: "2", state: WordleState.bad },
      { value: "C", state: WordleState.placement },
      { value: "O", state: WordleState.good },
      { value: "T", state: WordleState.bad }
    ]);
    expect(component.grille[4].letters).toEqual(defaultLine());
    expect(component.proposeWord).toBe("");

    //deuxieme Essais
    changeProposition("OCTO!", component, fixture);
    clickOnButton(fixture, "#proposeButton");

    expect(myFakeDriver.assert.actualEssais).toBe(2);
    expect(component.grille[1].letters).toEqual([
      { value: "O", state: WordleState.good },
      { value: "C", state: WordleState.good },
      { value: "T", state: WordleState.good },
      { value: "O", state: WordleState.good },
      { value: "!", state: WordleState.good }
    ]);
    expect(component.grille[4].letters).toEqual(defaultLine());

    expect(
      fixture.nativeElement.querySelector(".wordle-game-propose")
    ).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector(".wordle-game-end")
    ).toBeTruthy();
    expect(wordleGameViewModel.isWin).toBe(true);
    expect(wordleGameViewModel.isLoose).toBe(false);
    expect(fixture.nativeElement.querySelector("#restartButton")).toBeTruthy();
    expect(fixture.nativeElement.querySelector(".end-text")).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css(".end-text")).nativeElement.textContent
    ).toBe("WIN");

    clickOnButton(fixture, "#restartButton");
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(".wordle-game-start")
    ).toBeTruthy();
    expect(myFakeDriver.assert.actualEssais).toBe(0);
  });
});

describe("Partie perdante scenario", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;
  let myFakeDriver: Game1CoupPerdantDriverFake;
  let wordleGameViewModel: WordleGameViewModel;

  beforeEach(async () => {
    //myFakeDriver = new Game1CoupPerdantDriverFake(new WordleFakePresenter());
    myFakeDriver = new Game1CoupPerdantDriverFake(createFakePresenter());
    wordleGameViewModel = new WordleGameViewModel(myFakeDriver);
    wordleGameViewModel.nombreEssais = 1;

    await TestBed.configureTestingModule({
      imports: [WordleGameComponent, FormsModule],
      providers: [
        { provide: WordleGameViewModel, useFactory: () => wordleGameViewModel }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WordleGameComponent);
    component = fixture.componentInstance;
  });

  it("je fais une game perdante en 1 coups", () => {
    expect(fixture.nativeElement.querySelector("#startButton")).toBeFalsy();

    expect(myFakeDriver.assert.actualEssais).toBe(0);
    expect(myFakeDriver.assert.nombreEssais).toBe(1);

    fixture.detectChanges();
    clickOnButton(fixture, "#configureButton");
    fixture.detectChanges();
    expect(myFakeDriver.assert.nombreEssais).toBe(1);
    changeProposition("A", component, fixture);

    clickOnButton(fixture, "#proposeButton");
    fixture.detectChanges();

    expect(component.grille[0].letters).toEqual([
      { value: "A", state: WordleState.bad }
    ]);

    expect(
      fixture.nativeElement.querySelector(".wordle-game-end")
    ).toBeTruthy();
    expect(wordleGameViewModel.isLoose).toBe(true);
    expect(wordleGameViewModel.isWin).toBe(false);
    expect(fixture.nativeElement.querySelector(".end-text")).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css(".end-text")).nativeElement.textContent
    ).toBe("LOOSE");
    expect(fixture.nativeElement.querySelector("#restartButton")).toBeTruthy();
    clickOnButton(fixture, "#restartButton");
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(".wordle-game-start")
    ).toBeTruthy();
    expect(myFakeDriver.assert.actualEssais).toBe(0);
  });
});

function changeProposition(
  valueOfProposition: string,
  component: WordleGameComponent,
  fixture: ComponentFixture<WordleGameComponent>
) {
  component.proposeWord = valueOfProposition;
  fixture.detectChanges();
}

function clickOnButton(
  fixture: ComponentFixture<WordleGameComponent>,
  name: string
) {
  fixture.debugElement.query(By.css(name)).nativeElement.click();
  fixture.detectChanges();
}

function defaultLine() {
  return [
    { value: "?", state: WordleState.NoLettter },
    { value: "?", state: WordleState.NoLettter },
    { value: "?", state: WordleState.NoLettter },
    { value: "?", state: WordleState.NoLettter },
    { value: "?", state: WordleState.NoLettter }
  ];
}
