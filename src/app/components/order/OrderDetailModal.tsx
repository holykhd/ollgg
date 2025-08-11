import React from "react";

interface Order {
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

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const handlePayment = () => {
    alert(`주문 ${order.id}에 대한 작업이 완료되었습니다.`);
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
            <h5 className="modal-title">{order.id}</h5>
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
                  {/* 주문 정보 카드 */}
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="card h-100">
                        <div className="d-flex justify-content-between p-3 px-6">
                          <div className="d-flex justify-content-start align-items-center gap-4">
                            <h5 className="mb-1">
                              <strong>{order.id}</strong>
                            </h5>
                            <span className="badge bg-label-primary mb-1">
                              {order.status}
                            </span>
                          </div>
                          <h6 className="mb-1 text-secondary">
                            {order.createdAt}
                          </h6>
                        </div>
                        <div className="d-flex align-items-start row px-5 mb-3">
                          <div className="col-2">
                            <img
                              src={order.image}
                              width={138}
                              height={108}
                              className="rounded-2"
                              alt={order.productName}
                            />
                          </div>
                          <div className="col-10">
                            <h5 className="card-title mb-4 text-wrap">
                              <strong>{order.productName}</strong>
                              <span className="badge bg-label-secondary rounded-5">
                                {order.type}
                              </span>
                            </h5>
                            <p className="card-subtitle text-wrap">
                              옵션 및 수량 : {order.options}
                            </p>
                            <p className="card-subtitle text-wrap">
                              제품 커스텀 : {order.isCustom ? "Y" : "N"}
                            </p>
                            <p className="card-subtitle text-wrap">
                              희망 납기일 : {order.desiredDelivery}
                            </p>
                          </div>
                        </div>
                        {order.note && (
                          <div className="alert text-dark alert-primary alert-dismissible py-3 mx-3">
                            <span>{order.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

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
                                주문 관련 문의사항이나 특별 요청사항을 확인해
                                주세요.
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
                                <p className="mb-1">완료 일자</p>
                                <p className="mb-1 fw-bold">2025-06-23 07:00</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">유효 일자</p>
                                <p className="mb-1 fw-bold">2025-06-23 07:00</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">예상 납기일</p>
                                <p className="mb-1 fw-bold">결제 후 15일</p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex w-100 action-icons gap-3">
                            <div className="w-100 alert text-dark alert-primary alert-dismissible d-flex justify-content-between align-items-center">
                              <span>최종 주문 금액</span>
                              <strong className="text-primary fs-4">
                                {order.price.toLocaleString()} 원
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
                      </div>
                    </div>
                  </div>

                  {/* 주문 정보 섹션 */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="mb-0 fw-bold">주문 정보</h5>
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
                                <p className="mb-1">주문 상태</p>
                                <p className="mb-1 fw-bold">출고 준비</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="mb-1">예상 수령일</p>
                                <p className="mb-1 fw-bold">2025-08-08</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-end gap-2">
                              <button className="btn btn-label-danger">
                                주문 취소
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={handlePayment}
                              >
                                검수 정보
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

export default OrderDetailModal;
