import React from "react";

interface Quote {
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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuotes: Quote[];
  totalAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  selectedQuotes,
  totalAmount,
}) => {
  if (!isOpen) return null;

  const handlePayment = () => {
    alert(`총 ${totalAmount.toLocaleString()}원 결제가 완료되었습니다.`);
    onClose();
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
            <h5 className="modal-title">
              {selectedQuotes.length > 0 ? selectedQuotes[0].id : "#A034_12807"}
            </h5>
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
                  {/* 견적 정보 카드 */}
                  {selectedQuotes.map((quote) => (
                    <div key={quote.id} className="row mb-3">
                      <div className="col-12">
                        <div className="card h-100">
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start align-items-center gap-4">
                              <h5 className="mb-1">
                                <strong>{quote.id}</strong>
                              </h5>
                              <span className="badge bg-label-primary mb-1">
                                {quote.status}
                              </span>
                            </div>
                            <h6 className="mb-1 text-secondary">
                              {quote.createdAt}
                            </h6>
                          </div>
                          <div className="d-flex align-items-start row px-5 mb-3">
                            <div className="col-2">
                              <img
                                src={quote.image}
                                width={138}
                                height={108}
                                className="rounded-2"
                                alt={quote.productName}
                              />
                            </div>
                            <div className="col-10">
                              <h5 className="card-title mb-4 text-wrap">
                                <strong>{quote.productName}</strong>
                                <span className="badge bg-label-secondary rounded-5">
                                  {quote.type}
                                </span>
                              </h5>
                              <p className="card-subtitle text-wrap">
                                옵션 및 수량 : {quote.options}
                              </p>
                              <p className="card-subtitle text-wrap">
                                제품 커스텀 : {quote.isCustom ? "Y" : "N"}
                              </p>
                              <p className="card-subtitle text-wrap">
                                희망 납기일 : {quote.desiredDelivery}
                              </p>
                            </div>
                          </div>
                          {quote.note && (
                            <div className="alert text-dark alert-primary alert-dismissible py-3 mx-3">
                              <span>{quote.note}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 코멘트 섹션 */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header d-flex justify-content-between">
                          <h5 className="mb-0 fw-bold">코멘트</h5>
                          <small className="text-muted">2025-06-26 10:30</small>
                        </div>
                        <div className="card-body">
                          <div className="d-flex w-100 action-icons gap-3">
                            <div className="w-100 alert text-dark alert-primary alert-dismissible d-flex justify-content-between align-items-center">
                              <span>
                                이 상품은 KS인증이 있습니까? 알려 지켜주시길
                                바랍니다.
                              </span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-label-primary mb-4"
                            >
                              <i className="icon-base bx bx-plus icon-md"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 견적 정보 섹션 */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0 fw-bold">견적 정보</h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">견적 일시</p>
                                <p className="mb-1 fw-bold">2025-06-23 07:00</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">요금 확정</p>
                                <p className="mb-1 fw-bold">2025-06-28 07:00</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">예상 납기일</p>
                                <p className="mb-1 fw-bold">출시 후 15일</p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex w-100 action-icons gap-3">
                            <div className="w-100 alert text-dark alert-primary alert-dismissible d-flex justify-content-between align-items-center">
                              <span>최종 결제 금액</span>
                              <strong className="text-primary fs-4">
                                {totalAmount.toLocaleString()} 원
                              </strong>
                            </div>
                            <button
                              type="button"
                              className="btn btn-label-primary mb-4"
                            >
                              <i className="icon-base bx bx-minus icon-md"></i>
                            </button>
                          </div>
                          <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-end gap-2">
                              <button className="btn btn-outline-secondary">
                                견적 출력
                              </button>
                              <button
                                className="btn btn-outline-primary"
                                onClick={handlePayment}
                              >
                                바로 결제
                              </button>
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

export default PaymentModal;
