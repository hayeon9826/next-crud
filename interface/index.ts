// interface 타입 정의 (선언적 확장 가능)

export interface Post {
  id?: number;
  user: string;
  title: string;
  body: string;
  date: string;
}

export interface Todo {
  id?: number;
  title: string;
  finished: boolean;
}

export interface Counter {
  num: number;
}

export interface Faq {
  id?: number;
  position: number;
  title: string;
  body: string;
}

export interface ToggleTodo {
  id: number;
  finished: boolean;
}

export interface Form {
  id?: number;
  user: string;
  title: string;
  body: string;
  date: string;
}

export interface updatePostProps {
  id: number;
  post: Post;
}

export interface buttonProps {
  buttonText: string;
}

export interface PostStoreType {
  posts: Post[];
  error?: string;
  getPosts(): void;
  addPost(title: string, body: string, user: string, date: string): void;
  removePost(id: number): void;
  updatePost(id: number, post: Post): void;
  updateError({ error }: any): void;
}

export interface FaqStoreType {
  faqs: Faq[];
  error?: string;
  getFaqs(): void;
}

export interface TodoStoreType {
  todos: Todo[];
  error?: string;
  getTodos(): void;
  addTodo(title: string): void;
  removeTodo(id: number): void;
  toggle(id: number): void;
  updateError({ error }: any): void;
}

export interface NumberStoreType {
  num: number;
  increaseAction(num: number): void;
  decreaseAction(num: number): void;
  updateError({ error }: any): void;
}

export interface RootStoreType {
  postStore: PostStoreType;
  todoStore: TodoStoreType;
  numberStore: NumberStoreType;
  faqStore: FaqStoreType;
}
