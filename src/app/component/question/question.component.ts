import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from '../../model/data.models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  static _swapped: boolean = false;

  component = QuestionComponent;

  @Input({required: true})
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;
  @Input()
  set swapped(swapped: boolean) {
    QuestionComponent._swapped = swapped;
  }

  @Output()
  change = new EventEmitter<string>();
  @Output()
  swap: EventEmitter<Question> = new EventEmitter<Question>();

  currentSelection!: string;

  getButtonClass(answer: string): string {
    if (! this.userAnswer) {
        if (this.currentSelection == answer)
          return "tertiary";
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return "tertiary";
      if (answer == this.correctAnswer)
        return "secondary";
    }
    return "primary";
  }

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }
}
