import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';

function MyApp() {
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
              <li className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl">
                <button className="flex w-full text-left">
                  <div className="w-auto mr-8">
                    <span className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-indigo-100 rounded-full">
                      1
                    </span>
                  </div>
                  <div className="w-full mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">핀다는 다른 서비스와 무엇이 다른가요?</h3>
                      <span className="ml-4">
                        {showId === 1 ? (
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
                              setShowId(1);
                            }}
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`mt-6 border-l-2 border-gray-50 pl-10 ${
                        showId !== 1 && 'hidden'
                      }`}>
                      <p className="mb-5 text-base">
                        현재 온/오프라인 상에서 금융 상품에 대한 정보는 대부분 여러 군데 흩어져
                        있고, 여러 가지 다른 기준과 어려운 용어들로 설명되어 있어 고객들이 상품을
                        비교하고 결정하는 데 많은 어려움이 있습니다.
                      </p>
                      <p className="mb-2 text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          핀다에서는 금융상품 정보를 한군데 모아서 비교하기 편하게 제공합니다.
                        </span>
                      </p>
                      <p className="text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          또한 단순 비교에서 한 단계 나아가 개인의 상황과 특성에 따라 맞춤 상품을
                          추천해 드리고 있습니다.
                        </span>
                      </p>
                      <p className="my-5 text-base">
                        핀다에서 편하게 둘러보고, 상품도 추천받고, 쉽게 얻을 수 없는 꿀팁도
                        알아가세요!
                      </p>
                    </div>
                  </div>
                </button>
              </li>
              <li className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl">
                <button className="flex w-full text-left">
                  <div className="w-auto mr-8">
                    <span className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-indigo-100 rounded-full">
                      2
                    </span>
                  </div>
                  <div className="w-full mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">어떤 사람이 핀다를 이용하면 좋을까요?</h3>
                      <span className="ml-4">
                        {showId === 2 ? (
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
                              setShowId(2);
                            }}
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`mt-6 border-l-2 border-gray-50 pl-10 ${
                        showId !== 2 && 'hidden'
                      }`}>
                      <p className="mb-5 text-base font-semibold">귀차니즘과</p>
                      <p className="mb-2 text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          일일이 상품정보 알아보고 이해하는 게 너무 귀찮다! 그냥 누가 알아서
                          알려주고 추천해주면 편할텐데… 3분만에 상품 추천받기
                        </span>
                      </p>
                      <p className="my-5 text-base font-semibold">빨리빨리과</p>
                      <p className="text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          바쁘다, 바빠. 은행에 상담 받으러 갈 시간도 없지만, 가서 30분 ~ 1시간씩
                          상담 받고 싶지도 않아! 아... 빠르게 내가 원하는 상품 추천해줄 데 어디
                          없나? 꼭 필요한 질문만 답변하고 30배 빠르게 상품 추천받기
                        </span>
                      </p>
                      <p className="my-5 text-base font-semibold">엄청꼼꼼과</p>
                      <p className="text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          전부 다 파악하기 전에는 결정할 수 없어! 하지만 은행은 많고, 상품은 더
                          많고...언제 다 비교해보고 있지? 모든 상품 쉽게 비교해보기
                        </span>
                      </p>
                      <p className="my-5 text-base font-semibold">완전나야과</p>
                      <p className="text-base">
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span>
                          나한테 딱 맞는 상품이 있다면 당장이라도 가입할텐데... 그런 상품은 어디서
                          어떻게 찾지? 싱크로율 100%! 나한테 가장 잘 맞는 상품 추천받기
                        </span>
                      </p>
                    </div>
                  </div>
                </button>
              </li>
              <li className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl">
                <button className="flex w-full text-left">
                  <div className="w-auto mr-8">
                    <span className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-indigo-100 rounded-full">
                      3
                    </span>
                  </div>
                  <div className="w-full mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        핀다에서 제공하고 있는 상품에는 어떤 것들이 있나요?
                      </h3>
                      <span className="ml-4">
                        {showId === 3 ? (
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
                              setShowId(3);
                            }}
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`mt-6 border-l-2 border-gray-50 pl-10 ${
                        showId !== 3 && 'hidden'
                      }`}>
                      <p className="mb-5 text-base">
                        현재는 신용대출, P2P대출, P2P투자, 신용카드 뿐만 아니라 주택담보대출, 자동차
                        대출, 정기예금, 적금까지 총 8가지 카테고리의 상품 정보를 제공하고 있습니다.
                        향후 고객의 수요에 맞춰 더 다양한 상품을 소개할 수 있도록 노력하겠습니다.
                      </p>
                    </div>
                  </div>
                </button>
              </li>
              <li className="mb-4 px-4 lg:px-12 py-8 bg-white rounded-2xl">
                <button className="flex w-full text-left">
                  <div className="w-auto mr-8">
                    <span className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-indigo-100 rounded-full">
                      4
                    </span>
                  </div>
                  <div className="w-full mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        핀다에서 제공하고 있는 정보는 믿을 수 있나요?
                      </h3>
                      <span className="ml-4">
                        {showId === 4 ? (
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
                              setShowId(4);
                            }}
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`mt-6 border-l-2 border-gray-50 pl-10 ${
                        showId !== 4 && 'hidden'
                      }`}>
                      <p className="mb-5 text-base">
                        핀다에서는 금융감독원에서 제공하고 있는 API 및 각 제휴사의 API를 통해
                        실시간으로 상품 정보를 불러와서 가장 최신의 정보를 빠르고 정확하게 제공하고
                        있습니다. 또한 핀다의 계산 로직은 금융 회사에 종사하는 수많은 실무자에게
                        자문을 받아 수차례 검증을 거쳐 설계되었습니다. 안심하고 이용하세요!
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyApp;
