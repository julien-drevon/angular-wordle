import { Component, Input } from "@angular/core";
import { WordleState } from "../../view/wordleState";

@Component({
  selector: "wordle-case",
  standalone: true,
  imports: [],
  templateUrl: "./wordle-case.component.html",
  styleUrl: "./wordle-case.component.scss"
})
export class WordleCaseComponent {
  @Input()
  public letter = "?";
  @Input()
  public state: WordleState = WordleState.NoLettter;
  public getClass(): string {
    return "wordle-letter " + this.state;
  }
}
