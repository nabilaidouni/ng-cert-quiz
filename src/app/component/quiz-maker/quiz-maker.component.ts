import {Component, OnInit} from '@angular/core';
import {Category, Difficulty, Question, SubCategory} from '../../model/data.models';
import {map, Observable, of, Subject, switchMap} from 'rxjs';
import {QuizService} from '../../service/quiz.service';
import {ItemService} from '../../service/category.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
  categories$: Observable<Category[]>;
  currentCategory$: Subject<Category> = new Subject<Category>();
  subCategories$: Observable<SubCategory[]>;

  category: Category;
  subCategory: SubCategory;

  questions$: Observable<Question[]>;

  constructor(protected quizService: QuizService,
              private itemService: ItemService<Category, SubCategory>) {}

  ngOnInit() {
    this.categories$ = this.quizService.getAllSubCategories().pipe(
        map((subCategories: SubCategory[]) => this.itemService.toItems(subCategories))
    );

    this.subCategories$ = this.currentCategory$.asObservable().pipe(
        switchMap((category: Category) => of(category.subItems))
    );
  }

  updateSubCategories(category: Category): void {
    this.category = category;
    this.subCategory = category.subItems.length === 1 ? category.subItems[0] : null;
    this.currentCategory$.next(category);
  }

  createQuiz(cat: string, difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(cat, difficulty as Difficulty);
  }
}
