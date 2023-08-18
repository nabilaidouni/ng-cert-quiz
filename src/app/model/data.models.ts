export interface Nameable {
  name: string;
}

export interface Identifiable {
  id: string;
}

export interface NameableAndIdentifiable extends Nameable, Identifiable {}

export interface ArrayNameable extends Nameable {
  subItems: NameableAndIdentifiable[]
}

export interface Category extends ArrayNameable {}

export interface SubCategory extends NameableAndIdentifiable {}

export interface ApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export interface Results {
  questions: Question[];
  answers: string[];
  score: number;
}


export type Difficulty = "Easy" | "Medium" | "Hard";
