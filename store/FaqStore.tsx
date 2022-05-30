import { makeObservable, observable, flow } from 'mobx';
import { Faq, FaqStoreType } from '../interface';
import * as API from '../lib/api';
import { AxiosResponse } from 'axios';

export class FaqStore implements FaqStoreType {
  rootStore;
  faqs: Faq[] = [];
  error: string | null = null;

  constructor(root: any) {
    makeObservable(this, {
      faqs: observable,
      error: observable,
      getFaqs: flow
    });
    this.rootStore = root;
    this.faqs = [];
    this.error = null;
  }

  *getFaqs() {
    try {
      const response: AxiosResponse = yield API.getFaqs();
      const faq = response.data;
      this.faqs = faq;
    } catch (e) {
      console.log(e);
      this.updateError({ error: 'FAQ 목록을 가져올 수 없습니다. 다시 시도해주세요.' });
    }
  }

  updateError({ error }: { error: string }) {
    this.error = error;
  }
}
