import { Component, Input } from "@angular/core";
import { WordleCaseComponent } from "../wordle-case/wordle-case.component";
import { WordleLine } from "../models/WordleLine";

@Component({
  selector: "wordle-line",
  standalone: true,
  imports: [WordleCaseComponent],
  templateUrl: "./wordle-line.component.html",
  styleUrl: "./wordle-line.component.scss"
})
export class WordleLineComponent {
  @Input()
  public line: WordleLine = new WordleLine();
  public getClass(): string {
    return (
      "wordle-line " + (this.line && this.line.isGoodWord() ? " good-word" : "")
    );
  }
}


