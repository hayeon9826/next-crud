import { NumberStore } from './NumberStore';
import { TodoStore } from './TodoStore';
import { PostStore } from './PostStore';
import { FaqStore } from './FaqStore';
import {
  RootStoreType,
  NumberStoreType,
  PostStoreType,
  TodoStoreType,
  FaqStoreType
} from '../interface';

export class RootStore implements RootStoreType {
  numberStore: NumberStoreType;
  postStore: PostStoreType;
  todoStore: TodoStoreType;
  faqStore: FaqStoreType;

  constructor() {
    this.numberStore = new NumberStore(this);
    this.postStore = new PostStore(this);
    this.todoStore = new TodoStore(this);
    this.faqStore = new FaqStore(this);
  }
}
