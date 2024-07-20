import { Component, Inject } from "@angular/core";
import { WordleLineComponent } from "../wordle-line/wordle-line.component";
import { WordleLetter } from "../../view/WordleLetter";
import { WordleState } from "../../view/wordleState";

@Component({
  selector: "app-wordle-game",
  standalone: true,
  imports: [],
  templateUrl: "./wordle-game.component.html",
  styleUrl: "./wordle-game.component.scss"
})
export class WordleGameComponent {
  constructor(private _ViewModel: WordleGameViewModel) {}

  propose(arg0: string) {
    throw new Error("Method not implemented.");
  }
  startNewGame(nbEssais: number, motATrouver = "") {
    this._ViewModel.createGrille(nbEssais);
  }

  get Grille(): WordleLineComponent[] {
    return this._ViewModel.grille;
  }
  setViewModel(viewModel: WordleGameViewModel): void {
    this._ViewModel = viewModel;
  }
}

export class WordleGameViewModel {
  //constructor(@Inject("IGameProvider") private gameProvider: IGameProvider) {}

  private _Grille: WordleLineComponent[] = [];
  get grille(): WordleLineComponent[] {
    return this._Grille;
  }

  createGrille(taille: number): void {
    const newGrille: WordleLineComponent[] = [];
    for (let i = 0; i < taille; i++) {
      newGrille.push(this.createDefautWordleLine());
    }
    this._Grille = newGrille;
  }

  private createDefautWordleLine(): WordleLineComponent {
    const line = new WordleLineComponent();
    line.letters = this.createLine();
    return line;
  }

  private createLine() {
    return [
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter),
      new WordleLetter("?", WordleState.NoLettter)
    ];
  }
}

export interface IGameProvider {
  createGame(mot: string, nbEssais: number): void;
}
