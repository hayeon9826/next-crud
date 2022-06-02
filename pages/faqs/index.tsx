import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { Faq } from 'interface';
import { GetStaticProps } from 'next';
import * as API from '../../lib/api';
import { AxiosResponse } from 'axios';

const FaqPage: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
  const [showId, setShowId] = useState(0);

  return (
    <>
      <section className="py-20 2xl:py-40 bg-indigo-50">
        <div className="container px-4 mx-auto">
          <div className="mb-20 text-center">
            <span className="text-lg font-bold text-indigo-500">
              세상에 없던 대출 비교 플랫폼, 핀다
            </span>
            <h2 className="mt-8 text-5xl font-bold font-heading">자주 묻는 질문</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <ul>
              {faqs && faqs.length ? (
                faqs.map((faq: Faq) => (
                  <li className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl" key={faq.id}>
                    <button className="flex w-full text-left">
                      <div className="w-auto mr-8">
                        <span className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-indigo-100 rounded-full">
                          {faq.position}
                        </span>
                      </div>
                      <div className="w-full mt-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">{faq.title}</h3>
                          <span className="ml-4">
                            {showId === faq.position ? (
                              <ChevronUpIcon
                                className="w-5 h-5 text-indigo-600"
                                onClick={() => {
                                  setShowId(0);
                                }}
                              />
                            ) : (
                              <ChevronDownIcon
                                className="w-5 h-5 text-indigo-600"
                                onClick={() => {
                                  setShowId(faq.position);
                                }}
                              />
                            )}
                          </span>
                        </div>
                        <div
                          className={`mt-6 border-l-2 border-gray-50 pl-4 ${
                            showId !== faq.position && 'hidden'
                          }`}>
                          <p className="mb-5 text-base">{faq.body}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <div className="shadow-md col-span-3 w-100 cursor-pointer bg-white rounded-lg relative block p-6">
                  <div className="no_content">등록된 FAQ가 없습니다.</div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response: AxiosResponse = await API.getFaqs();
  const faqs: Faq = response.data;

  // Pass faq data to the page via props
  return { props: { faqs } };
};

export default FaqPage;
