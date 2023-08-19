import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuizMakerComponent} from './component/quiz-maker/quiz-maker.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { QuestionComponent } from './component/question/question.component';
import { AnswersComponent } from './component/answers/answers.component';
import { FilterInputComponent } from './component/filter-input/filter-input.component';
import {BoldPipe} from './pipe/bold.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    FilterInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BoldPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
