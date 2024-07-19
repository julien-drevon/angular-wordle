import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordleCaseComponent } from './wordle-case.component';
import { By } from "@angular/platform-browser";
import { WordleState } from "../../view/wordleState";

describe('WordleCaseComponent', () => {
  let component: WordleCaseComponent;
  let fixture: ComponentFixture<WordleCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordleCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it("quand je definie une lettre dans une case elle doit s'afficher", ()=>{

  component.letter = "A";
  fixture.detectChanges();

  expect(fixture.debugElement.query(By.css(".wordle-letter")).nativeElement.textContent).toContain("A");
})

  it('Quabnd je définie la case comme un good word, le css good-word doit être appliqué', ()=>{
    component.state = WordleState.good;
    fixture.detectChanges();
    const actual = fixture.debugElement.query(By.css(".good-letter"));
    expect(actual).toBeTruthy();
  }) 
  
  it('Quabnd je définie la case comme un bad word, le css bad-word doit être appliqué', ()=>{
    component.state = WordleState.bad;
    fixture.detectChanges();
    const actual = fixture.debugElement.query(By.css(".bad-letter"));
    expect(actual).toBeTruthy();
  })
});
