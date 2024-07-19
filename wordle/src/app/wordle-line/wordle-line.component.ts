import { Component, Input } from '@angular/core';
import { WordleCaseComponent} from "../wordle-case/wordle-case.component";
import { WordleLetter } from "../../view/WordleLetter";
import { WordleState } from "../../view/wordleState";

@Component({
  selector: 'wordle-line',
  standalone: true,
  imports: [WordleCaseComponent],
  templateUrl: './wordle-line.component.html',
  styleUrl: './wordle-line.component.scss'
})
export class WordleLineComponent {
  @Input()  
  public line:WordleLetter[]=[]
  public getClass():string{
    return "wordle-line "+ (this.line.every(x=> x.state == WordleState.good) ? " good-word" : "");
  }
}


