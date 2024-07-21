import { WordleLetter } from "./WordleLetter";
import { WordleState } from "./wordleState";
import { WordleLine } from "./WordleLine";


export class WordleGameViewModel {
    //constructor(@Inject("IGameProvider") private gameProvider: IGameProvider) {}
    private _grille: WordleLine[] = [];
    get grille(): WordleLine[] {
        return this._grille;
    }

    createGrille(taille: number): void {
        const newGrille: WordleLine[] = [];
        for (let i = 0; i < taille; i++) {
            newGrille[i] = new WordleLine(this.createDefautWordleLine());
        }
        this._grille = newGrille;
    }

    private createDefautWordleLine(): WordleLetter[] {
        const line = [
            new WordleLetter("?", WordleState.NoLettter),
            new WordleLetter("?", WordleState.NoLettter),
            new WordleLetter("?", WordleState.NoLettter),
            new WordleLetter("?", WordleState.NoLettter),
            new WordleLetter("?", WordleState.NoLettter)
        ];
        return line;
    }
}
