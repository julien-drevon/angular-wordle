import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WordleLineComponent } from "./wordle-line.component";
import { WordleLine } from "../models/WordleLine";
import { By } from "@angular/platform-browser";
import { WordleLetter } from "../models/WordleLetter";
import { WordleState } from "../models/wordleState";

describe("WordleLineComponent", () => {
  let component: WordleLineComponent;
  let fixture: ComponentFixture<WordleLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleLineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WordleLineComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("quand je definie une ligne toutes les wordle-case doivent y etre", () => {
    component.line = new WordleLine([
      new WordleLetter("A", WordleState.good),
      new WordleLetter("B", WordleState.placement)
    ]);
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css(".wordle-letter"))
    ).toHaveLength(2);
  });

  it("quand je definie une ligne toutes les wordle-case avec les lettres doivent y etre", () => {
    component.line = new WordleLine([
      new WordleLetter("A", WordleState.good),
      new WordleLetter("B", WordleState.placement)
    ]);
    fixture.detectChanges();

    const textDesCases = fixture.debugElement.queryAll(
      By.css(".wordle-letter")
    );
    expect(textDesCases[0].nativeElement.textContent).toContain("A");
    expect(textDesCases[1].nativeElement.textContent).toContain("B");

    const goodLetter = fixture.debugElement.query(By.css(".good-letter"));
    expect(goodLetter).toBeTruthy();

    const badLetter = fixture.debugElement.query(By.css(".placement-letter"));
    expect(badLetter).toBeTruthy();

    const isGoodWord = fixture.debugElement.query(By.css(".good-word"));
    expect(isGoodWord).toBeFalsy();
  });

  it("quand je definie une ligne ou toute les terres sont good, on doit avoir le style good-word", () => {
    component.line = new WordleLine([
      new WordleLetter("A", WordleState.good),
      new WordleLetter("B", WordleState.good)
    ]);
    fixture.detectChanges();

    const textContent = fixture.debugElement.query(By.css(".good-word"));
    expect(textContent).toBeTruthy();
  });
});
