import React from "react";

interface Payment {
  id: string;
  status: string;
  createdAt: string;
  image: string;
  productName: string;
  type: string;
  options: string;
  isCustom: boolean;
  desiredDelivery: string;
  note?: string;
  price: number;
}

interface PaymentDetailModalProps {
  payment?: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentDetailModal: React.FC<PaymentDetailModalProps> = ({
  payment,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !payment) return null;

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{payment.id}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="custom-bg p-5" style={{ borderRadius: "20px" }}>
                  {/* 결제 정보 카드 */}
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="card h-100">
                        <div className="d-flex justify-content-between p-3 px-6">
                          <div className="d-flex justify-content-start align-items-center gap-4">
                            <h5 className="mb-1">
                              <strong>{payment.id}</strong>
                            </h5>
                            <span className="badge bg-label-primary mb-1">
                              {payment.status}
                            </span>
                          </div>
                          <h6 className="mb-1 text-secondary">
                            {payment.createdAt}
                          </h6>
                        </div>
                        <div className="d-flex align-items-start row px-5 mb-3">
                          <div className="col-2">
                            <img
                              src={payment.image}
                              width={138}
                              height={108}
                              className="rounded-2"
                              alt={payment.productName}
                            />
                          </div>
                          <div className="col-10">
                            <h5 className="card-title mb-4 text-wrap">
                              <strong>{payment.productName}</strong>
                              <span className="badge bg-label-secondary rounded-5">
                                {payment.type}
                              </span>
                            </h5>
                            <p className="card-subtitle text-wrap">
                              옵션 및 수량 : {payment.options}
                            </p>
                            <p className="card-subtitle text-wrap">
                              제품 커스텀 : {payment.isCustom ? "Y" : "N"}
                            </p>
                            <p className="card-subtitle text-wrap">
                              희망 납기일 : {payment.desiredDelivery}
                            </p>
                          </div>
                        </div>
                        {payment.note && (
                          <div className="alert text-dark alert-primary alert-dismissible py-3 mx-3">
                            <span>{payment.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 결제 정보 섹션 */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0 fw-bold">결제 정보</h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">완료 일자</p>
                                <p className="mb-1 fw-bold">2025-06-23 07:00</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">결제 방법</p>
                                <p className="mb-1 fw-bold">카드 결제</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">결제 카드</p>
                                <p className="mb-1 fw-bold">
                                  8234-****-****-5974
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex w-100 action-icons gap-3">
                            <div className="w-100 alert text-dark alert-primary alert-dismissible d-flex justify-content-between align-items-center">
                              <span>최종 결제 금액</span>
                              <strong className="text-primary fs-4">
                                {payment.price.toLocaleString()} 원
                              </strong>
                            </div>
                            <button
                              type="button"
                              className="btn btn-label-primary mb-4"
                            >
                              <i className="icon-base bx bx-minus icon-md"></i>
                            </button>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="d-flex justify-content-between p-3 px-6 mx-5">
                            <div className="d-flex justify-content-start">
                              <span className="text-primary me-2">
                                <i className="icon-base bx bxs-circle icon-12px"></i>
                              </span>
                              <p className="mb-0">결제 내역</p>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">2025.07-22 12:23:33</p>
                            </div>
                          </div>

                          {/* 결제 내역 시작 */}
                          <div className="table-responsive text-nowrap rounded mx-6">
                            <table className="table table-responsive table-bordered table-hover mb-5">
                              <thead className="bg-label-secondary fw-bold">
                                <tr className="text-center">
                                  <th>견적 번호</th>
                                  <th>결제 방법</th>
                                  <th>결제 카드</th>
                                  <th>구매 상품</th>
                                  <th>수량</th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                <tr>
                                  <td>
                                    <i className="icon-base fab fa-angular icon-md text-danger me-4"></i>
                                    <span>#A034_12804</span>
                                  </td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td className="text-end">350개</td>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="icon-base fab fa-angular icon-md text-danger me-4"></i>
                                    <span>#A034_12804</span>
                                  </td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td className="text-end">350개</td>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="icon-base fab fa-angular icon-md text-danger me-4"></i>
                                    <span>#A034_12804</span>
                                  </td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td className="text-end">350개</td>
                                </tr>
                                <tr>
                                  <td>
                                    <i className="icon-base fab fa-angular icon-md text-danger me-4"></i>
                                    <span>#A034_12804</span>
                                  </td>
                                  <td>카드 결제</td>
                                  <td>8234-****-****-5974</td>
                                  <td>Solid Wooden Chair</td>
                                  <td className="text-end">350개</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* 결제 내역 종료 */}
                          {/* 업체 정보 시작 */}
                          <div className="d-flex justify-content-start p-3 px-6 mx-5">
                            <span className="text-primary me-2">
                              <i className="icon-base bx bxs-circle icon-12px"></i>
                            </span>
                            <p className="mb-0">업체 정보</p>
                          </div>
                          {/* 내용 시작 */}
                          <div className="row gap-xl-9 mx-3">
                            <div className="col-lg-12 col-xl-5 border rounded mb-4 p-5 mx-xl-3">
                              <h6>서비스 업체</h6>
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        상호:
                                      </span>
                                    </td>
                                    <td>주식회사 뉴프렌즈</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        대표이사:
                                      </span>
                                    </td>
                                    <td>홍승표</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        사업자등록번호:
                                      </span>
                                    </td>
                                    <td>898-81-02971</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        고객센터:
                                      </span>
                                    </td>
                                    <td>031-895-5253</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        주소:
                                      </span>
                                    </td>
                                    <td>경기도 화성시 동탄영천로 101</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        호스팅 사업자:
                                      </span>
                                    </td>
                                    <td>Amazon Web Service (AWS)</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-lg-12 col-xl-6 border rounded mb-4 p-5 mx-xl-3">
                              <h6>결제 대행 업체:</h6>
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        상호:
                                      </span>
                                    </td>
                                    <td className="fw-medium">
                                      토스페이먼츠(주)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        대표자명:
                                      </span>
                                    </td>
                                    <td>임한욱</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100">
                                        사업자등록번호:
                                      </span>
                                    </td>
                                    <td>411-86-01799</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        전화번호:
                                      </span>
                                    </td>
                                    <td>1544- 7772</td>
                                  </tr>
                                  <tr>
                                    <td className="pe-4">
                                      <span className="badge bg-label-primary me-1 w-px-100 my-2">
                                        주소:
                                      </span>
                                    </td>
                                    <td>
                                      서울특별시 강남구 테헤란로 131, 14층
                                      <br />
                                      (역삼동, 한국지식재산센터)
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* 내용 종료 */}
                          {/* 업체 정보 종료 */}
                          {/* 최종 결제 금액 시작 */}
                          <div className="card-header">
                            <h5 className="mb-0 fw-bold">
                              <span className="text-primary me-2">
                                <i className="icon-base bx bxs-circle icon-12px"></i>
                              </span>
                              최종 결제 금액 :{" "}
                              <span className="text-primary">5,440,000 원</span>
                            </h5>
                            <div className="col-12 d-flex justify-content-end">
                              <button className="btn btn-outline-secondary">
                                영수증 출력
                              </button>
                            </div>
                          </div>

                          {/* 최종 결제 금액 종료 */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-lg btn-primary w-px-300"
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;
