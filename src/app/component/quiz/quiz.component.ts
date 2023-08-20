import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../model/data.models';
import {QuizService} from '../../service/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input()
  questions: Question[] = [];

  bonusQuestion: Question;

  userAnswers: string[] = [];

  swapped: boolean = false;

  constructor(private quizService: QuizService,
              private router: Router) {}

  ngOnInit() {
    if (this.questions?.length > 0) {
      this.bonusQuestion = this.questions[this.questions.length -1];
      this.questions = this.questions.slice(0, this.questions.length -1);
    }
  }

  swap(question: Question) {
    this.questions.splice(this.questions.indexOf(question), 1, this.bonusQuestion);
    this.swapped = true;
  }

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }
}
