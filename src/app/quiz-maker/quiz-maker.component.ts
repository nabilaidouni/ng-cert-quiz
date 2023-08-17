import {Component} from '@angular/core';
import {Category, Difficulty, Question} from '../model/data.models';
import {Observable} from 'rxjs';
import {QuizService} from '../service/quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {

  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;

  category!: Category;

  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories()
  }

  createQuiz(cat: string, difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(cat, difficulty as Difficulty);
  }
}
