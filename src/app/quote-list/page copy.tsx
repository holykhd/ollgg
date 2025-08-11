import Image from "next/image";

export default function QuoteListPage() {
  return (
    <>
      <div className="row text-nowrap">
        <div className="col-12">
          <div className="card vh-75">
            <h4 className="card-header">견적관리</h4>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-primary text-white">
                      <span className="text-start">전체 견적</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-label-primary text-dark">
                      <span className="text-start">견적 요청</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-label-primary text-dark">
                      <span className="text-start">견적 확인증</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-label-primary text-dark">
                      <span className="text-start">견적 완료</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-label-primary text-dark">
                      <span className="text-start">결제 완료</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <a href="#">
                    <div className="alert bg-label-primary text-dark">
                      <span className="text-start">견적 취소</span>
                      <h3 className="alert-heading mb-1 text-end">10</h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div
                    className="alert text-dark"
                    style={{ backgroundColor: "#f8fcff" }}
                  >
                    <div className="row">
                      <div className="col-xl-12 col-xxl-6 mb-3">
                        <div
                          className="card h-100 border-2 border-primary cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#backDropModal"
                        >
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start align-items-center gap-4">
                              <h5 className="mb-1">
                                <strong>#A034_12804</strong>
                              </h5>
                              <span className="badge bg-label-primary mb-1">
                                견적요청
                              </span>
                            </div>
                            <h6 className="mb-1 text-secondary">
                              2025.07-22 12:23:33
                            </h6>
                          </div>
                          <div className="d-flex align-items-start row px-5 mb-3">
                            <div className="col-3">
                              <img
                                src="/assets/img/product-img.png"
                                width="108"
                                height="108"
                                className="rounded-2"
                                alt="Chair Solid Wooden"
                              />
                            </div>
                            <div className="col-9">
                              <h5 className="card-title mb-4 text-wrap">
                                <strong>ChairSolid Wooden</strong>
                                <span className="badge bg-label-secondary rounded-5">
                                  B2B
                                </span>
                              </h5>
                              <p className="card-subtitle text-wrap">
                                옵션 및 수량 : 블랙, 60cm*120cm, 300개
                              </p>
                              <p className="card-subtitle text-wrap">
                                제품 커스텀 : Y
                              </p>
                              <p className="card-subtitle text-wrap">
                                희망 납기일 : 10일 이내 희망
                              </p>
                            </div>
                          </div>
                          <div
                            className="alert text-dark alert-primary alert-dismissible py-3 mx-5"
                            role="alert"
                          >
                            <span>빠른 배송 부탁합니다.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="backDropModal"
        data-bs-backdrop="static"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="backDropModalTitle">
                #A034_12807
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div
                    className="custom-bg p-5"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="card h-100">
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start align-items-center gap-4">
                              <h5 className="mb-1">
                                <strong>#A034_12804</strong>
                              </h5>
                              <span className="badge bg-label-primary mb-1">
                                견적요청
                              </span>
                            </div>
                            <h6 className="mb-1 text-secondary">
                              2025.07-22 12:23:33
                            </h6>
                          </div>
                          <div className="d-flex align-items-start row px-5 mb-3">
                            <div className="col-2">
                              <Image
                                src="/assets/img/product-img.png"
                                width={138}
                                height={108}
                                className="rounded-2"
                                alt="Chair Solid Wooden"
                              />
                            </div>
                            <div className="col-10">
                              <h5 className="card-title mb-4 text-wrap">
                                <strong>ChairSolid Wooden</strong>
                                <span className="badge bg-label-secondary rounded-5">
                                  B2B
                                </span>
                              </h5>
                              <p className="card-subtitle text-wrap">
                                옵션 및 수량 : 블랙, 60cm*120cm, 300개
                              </p>
                              <p className="card-subtitle text-wrap">
                                제품 커스텀 : Y
                              </p>
                              <p className="card-subtitle text-wrap">
                                희망 납기일 : 10일 이내 희망
                              </p>
                            </div>
                          </div>
                          <div className="alert text-dark alert-primary alert-dismissible py-3 mx-3">
                            <span>빠른 배송 부탁합니다.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card h-100">
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start align-items-center gap-4">
                              <h5 className="mb-1">
                                <strong>결제 정보</strong>
                              </h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-start row px-5 mb-3">
                            <div className="row gy-4 gy-sm-1">
                              <div className="col-sm-6 col-lg-4">
                                <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-4 pb-sm-0">
                                  <p className="mb-1">완료 일자</p>
                                  <p className="mb-1 me-6">
                                    2025-07-22 09:00
                                  </p>
                                </div>
                              </div>
                              <div className="col-sm-6 col-lg-4">
                                <div className="d-flex justify-content-between align-itemscenter card-widget-1 border-end pb-4 pb-sm-0">
                                  <p className="mb-1">결제 방법</p>
                                  <p className="mb-1 me-6">
                                    카드 결제
                                  </p>
                                </div>
                              </div>
                              <div className="col-sm-6 col-lg-4">
                                <div className="d-flex justify-content-between align-itemscenter card-widget-1 pb-4 pb-sm-0">
                                  <p className="mb-1">결제 카드</p>
                                  <p className="mb-1">
                                    8234-****-****-5974
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex w-100 action-icons px-4 gap-3">
                            <div className="w-100 alert text-dark alert-primary alert-dismissible d-flex justify-content-between align-items-center">
                              <span>최종 결제 금액</span>
                              <span>4,921,500 원</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-label-primary mb-4"
                            >
                              <i className="icon-base bx bx-minus icon-md"></i>
                            </button>
                          </div>
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start">
                              <span className="text-primary me-2">
                                <i className="icon-base bx bxs-circle icon-12px"></i>
                              </span>
                              <p className="mb-0">결제 내역</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">
                                2025.07-22 12:23:33
                              </p>
                            </div>
                          </div>
                          <div className="table-responsive border border-bottom-0 border-top-0 rounded mx-4">
                            <table className="table m-0">
                              <thead>
                                <tr className="bg-label-secondary">
                                  <th>견적 번호</th>
                                  <th>결제 방법</th>
                                  <th>결제 카드</th>
                                  <th>구매 상품</th>
                                  <th>수량</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                                <tr>
                                  <td>#A034_12804</td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td>$32.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start">
                              <span className="text-primary me-2">
                                <i className="icon-base bx bxs-circle icon-12px"></i>
                              </span>
                              <p className="mb-0">업체 정보</p>
                            </div>
                          </div>
                          <div className="row mx-1">
                            <div className="col-lg-5 col-12">
                              <div className="cardMaster border p-6 rounded mb-4 h-px-300">
                                <div className="card-information">
                                  <div className="d-flex flex-column align-items-start mb-2">
                                    <h6 className="mb-2 me-2">
                                      서비스 업체
                                    </h6>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        상호
                                      </span>
                                      <span>주식회사 뉴프렌즈</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        대표이사
                                      </span>
                                      <span>홍승표</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        사업자등록번호
                                      </span>
                                      <span>898-81-02971</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        고객센터
                                      </span>
                                      <span>031-895-5253</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        주소
                                      </span>
                                      <span>
                                        경기도 화성시 동탄영천로 101
                                      </span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        호스팅 사업자
                                      </span>
                                      <span>
                                        Amazone Web Service(AWS)
                                      </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-7 col-12">
                              <div className="cardMaster border p-6 rounded mb-4 h-px-300">
                                <div className="card-information">
                                  <div className="d-flex flex-column align-items-start mb-2">
                                    <h6 className="mb-2 me-2">
                                      결제 대행 업체
                                    </h6>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        상호
                                      </span>
                                      <span>토스페이먼츠(주)</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        대표이사
                                      </span>
                                      <span>임한욱</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        사업자등록번호
                                      </span>
                                      <span>481-86-01799</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        고객센터
                                      </span>
                                      <span>1544-7772</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        주소
                                      </span>
                                      <span>
                                        서울특별시 강남구 테헤란로
                                        131, 14층 (역삼동,
                                        한국지식재산센터)
                                      </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start">
                              <span className="text-primary me-2">
                                <i className="icon-base bx bxs-circle icon-12px"></i>
                              </span>
                              <p className="mb-0">최종 결제 금액</p>
                              <p className="mx-3 mb-0 text-primary">
                                <strong>4,580,000원</strong>
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end p-3 px-6">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                            >
                              영수증 출력
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="modal-footer d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary w-px-300"
                    data-bs-dismiss="modal"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}