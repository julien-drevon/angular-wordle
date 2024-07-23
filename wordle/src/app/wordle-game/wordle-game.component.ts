import { FormsModule } from "@angular/forms";
import { Component, Input } from "@angular/core";
import { WordleLineComponent } from "../wordle-line/wordle-line.component";
import { WordleLine } from "../models/WordleLine";
import { WordleGameViewModel } from "../models/WordleGameViewModel";

@Component({
  selector: "wordle-game",
  standalone: true,
  imports: [WordleLineComponent, FormsModule],
  templateUrl: "./wordle-game.component.html",
  styleUrl: "./wordle-game.component.scss"
})
export class WordleGameComponent {
  constructor(private _viewModel: WordleGameViewModel) {}

  @Input()
  public initWord = "";

  @Input()
  public proposeWord = "";
  public restart() {
    this.initWord = "";
    this._viewModel.restart();
  }
  public start() {
    this._viewModel.initGame(this.initWord);
  }

  public propose() {
    this._viewModel.propose(this.proposeWord);
    this.proposeWord = "";
  }
  get grille(): WordleLine[] {
    return this._viewModel.grille;
  }

  get viewModel(): WordleGameViewModel {
    return this._viewModel;
  }
}
