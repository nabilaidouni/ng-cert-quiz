import {Component, OnInit} from '@angular/core';
import {Category, Difficulty, Question, SubCategory} from '../model/data.models';
import {map, Observable, of, Subject, switchMap} from 'rxjs';
import {QuizService} from '../service/quiz.service';
import {CategoryService} from '../service/category.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
  categories$: Observable<Category[]>;
  currentCategory$ = new Subject<Category>();
  subCategories$: Observable<SubCategory[]>;

  category: Category;
  subCategory: SubCategory;

  questions$: Observable<Question[]>;

  constructor(protected quizService: QuizService,
              private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.quizService.getAllSubCategories().pipe(
        map(subCategories => this.categoryService.toCategories(subCategories))
    );

    this.subCategories$ = this.currentCategory$.asObservable().pipe(
        switchMap(category => of(category.subCategories))
    );
  }

  updateSubCategories(category: Category) {
    this.category = category;
    this.subCategory = category.subCategories.length === 1 ? category.subCategories[0] : null;
    this.currentCategory$.next(category);
  }

  createQuiz(cat: string, difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(cat, difficulty as Difficulty);
  }
}
