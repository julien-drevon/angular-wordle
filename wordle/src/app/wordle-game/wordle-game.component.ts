import { Component, Inject } from "@angular/core";
import { WordleLineComponent } from "../wordle-line/wordle-line.component";
import { WordleLine } from "../models/WordleLine";
import { WordleGameViewModel } from "../models/WordleGameViewModel";

@Component({
  selector: "app-wordle-game",
  standalone: true,
  imports: [WordleLineComponent],
  templateUrl: "./wordle-game.component.html",
  styleUrl: "./wordle-game.component.scss"
})
export class WordleGameComponent {
  constructor(private _viewModel: WordleGameViewModel) {}

  startNewGame(nbEssais: number) {
    this._viewModel.createGrille(nbEssais);
  }

  get grille(): WordleLine[] {
    return this._viewModel.grille;
  }
}
