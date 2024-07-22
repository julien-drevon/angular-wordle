import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WordleGameComponent } from "./wordle-game.component";
import { WordleGameViewModel } from "../models/WordleGameViewModel";
import { By } from "@angular/platform-browser";
import { WordleState } from "../models/wordleState";
import { FormsModule } from "@angular/forms";
import { IGameDriver } from "../models/IGameDriver";

describe("WordleGameComponent", () => {
  let component: WordleGameComponent;
  let fixture: ComponentFixture<WordleGameComponent>;
  let myFakeDriver: GameDriverFake;
  let wordleGameViewModel: WordleGameViewModel;

  beforeEach(async () => {
    myFakeDriver = new GameDriverFake();
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
    wordleGameViewModel.startGame("TESTA");
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);

    wordleGameViewModel.startGame("TEST");
    fixture.detectChanges();
    expect(component.grille).toHaveLength(5);
  });

  it("quand je creer un jeux wordle les ligne doivent avoir ? et noLetter ", () => {
    wordleGameViewModel.startGame("A");
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
    wordleGameViewModel.startGame("DE");
    fixture.detectChanges();
    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(textDesLignes.length).toBe(10);
  });

  it("Quand le jeux n'est pas lancé, je veux le start en proposant un mot", () => {
    component.proposeWord = "OCTO!";
    const startButton = fixture.debugElement.query(
      By.css("#startButton")
    ).nativeElement;
    startButton.click();

    fixture.detectChanges();
    const textDesLignes = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );

    expect(textDesLignes.length).toBe(25);
    expect(myFakeDriver.called).toBe(true);
  });
});

class GameDriverFake implements IGameDriver {
  public called = false;
  createGame(mot: string, nbEssais: number): void {
    this.called = true;
  }
}
