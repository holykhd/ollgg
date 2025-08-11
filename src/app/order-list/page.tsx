"use client";

import React, { useState, ChangeEvent } from "react";
import { OrderDetailModal } from "../components";

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

export default function OrderListPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      // 전체 선택 - 현재 필터된 주문 ID들만 selectedOrders에 추가
      const filteredOrderIds = sampleOrders
        .filter((order) => !statusFilter || order.status === statusFilter)
        .map((order) => order.id);
      setSelectedOrders(filteredOrderIds);
    } else {
      // 전체 해제 - selectedOrders 비우기
      setSelectedOrders([]);
    }
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        // 이미 선택된 경우 제거
        const newSelected = prev.filter((id) => id !== orderId);
        // 모든 선택이 해제되면 전체 선택 체크박스도 해제
        if (newSelected.length === 0) {
          setIsChecked(false);
        }
        return newSelected;
      } else {
        // 선택되지 않은 경우 추가
        const newSelected = [...prev, orderId];
        // 현재 필터된 모든 주문이 선택되면 전체 선택 체크박스 활성화
        const filteredOrders = sampleOrders.filter(
          (order) => !statusFilter || order.status === statusFilter
        );
        if (newSelected.length === filteredOrders.length) {
          setIsChecked(true);
        }
        return newSelected;
      }
    });
  };

  const handleSelectCancel = () => {
    setSelectedOrders([]);
    setIsChecked(false);
  };

  const handleOrdersDelete = () => {
    // 주문 취소 로직 (현재는 선택 해제만)
    setSelectedOrders([]);
    setIsChecked(false);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleOrderModalClose = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // 상태별 필터링 함수
  const handleStatusFilter = (status: string) => {
    // 이미 활성화된 버튼 클릭 시 아무 작업하지 않음
    if (status === "" && statusFilter === null) {
      return; // 전체 주문이 이미 활성화된 상태
    }
    if (status !== "" && statusFilter === status) {
      return; // 해당 상태가 이미 활성화된 상태
    }

    if (status === "") {
      // 전체 주문 버튼 클릭 시
      setStatusFilter(null);
    } else {
      // 다른 상태 버튼 클릭 시
      setStatusFilter(status);
    }
    setSelectedOrders([]);
    setIsChecked(false);
  };

  // 샘플 주문 데이터 배열
  const sampleOrders: Order[] = [
    {
      id: "#O034_12804",
      status: "출고준비",
      createdAt: "2025.07-22 12:23:33",
      image: "/assets/img/product-img.png",
      productName: "Chair Solid Wooden",
      type: "B2B",
      options: "블랙, 60cm*120cm, 300개",
      isCustom: true,
      desiredDelivery: "10일 이내 희망",
      note: "빠른 배송 부탁합니다.",
      price: 4921500,
    },
    {
      id: "#O034_12805",
      status: "해외입고",
      createdAt: "2025.07-21 09:15:42",
      image: "/assets/img/product-img.png",
      productName: "Modern Sofa",
      type: "B2C",
      options: "베이지, 180cm*80cm, 50개",
      isCustom: false,
      desiredDelivery: "3주 이내",
      note: "색상 샘플 확인 후 주문",
      price: 3200000,
    },
    {
      id: "#O034_12806",
      status: "검수필요",
      createdAt: "2025.07-20 16:30:21",
      image: "/assets/img/product-img.png",
      productName: "Office Desk Premium",
      type: "B2B",
      options: "화이트, 140cm*80cm, 150개",
      isCustom: false,
      desiredDelivery: "2주 이내",
      note: "품질 확인 후 대량 주문 예정입니다.",
      price: 7850000,
    },
    {
      id: "#O034_12807",
      status: "국내출고",
      createdAt: "2025.07-19 14:45:18",
      image: "/assets/img/product-img.png",
      productName: "Executive Chair",
      type: "B2B",
      options: "가죽, 블랙, 80개",
      isCustom: true,
      desiredDelivery: "1개월 이내",
      note: "로고 새김 요청",
      price: 5400000,
    },
    {
      id: "#O034_12808",
      status: "세관입고",
      createdAt: "2025.07-18 11:20:05",
      image: "/assets/img/product-img.png",
      productName: "Storage Cabinet",
      type: "B2C",
      options: "그레이, 80cm*40cm*180cm, 50개",
      isCustom: true,
      desiredDelivery: "3주 이내",
      note: "로고 각인 필요합니다.",
      price: 2940000,
    },
    {
      id: "#O034_12809",
      status: "배송완료",
      createdAt: "2025.07-17 09:30:15",
      image: "/assets/img/product-img.png",
      productName: "Conference Table",
      type: "B2B",
      options: "오크원목, 200cm*100cm, 20개",
      isCustom: false,
      desiredDelivery: "1개월 이내",
      price: 8760000,
    },
    {
      id: "#O034_12810",
      status: "배송완료",
      createdAt: "2025.07-16 15:22:33",
      image: "/assets/img/product-img.png",
      productName: "Standing Desk",
      type: "B2B",
      options: "화이트, 120cm*70cm, 100개",
      isCustom: false,
      desiredDelivery: "2주 이내",
      price: 6200000,
    },
    {
      id: "#O034_12811",
      status: "주문취소",
      createdAt: "2025.07-15 10:45:20",
      image: "/assets/img/product-img.png",
      productName: "Meeting Room Table",
      type: "B2B",
      options: "마호가니, 300cm*150cm, 10개",
      isCustom: true,
      desiredDelivery: "6주 이내",
      note: "특별 주문 제작",
      price: 12500000,
    },
  ];

  // 상태별 주문 수 계산
  const getOrderCount = (status: string | null) => {
    if (status === null) {
      return sampleOrders.length; // 전체 주문
    }
    return sampleOrders.filter((order) => order.status === status).length;
  };

  return (
    <>
      <div className="row text-nowrap">
        <div className="col-12">
          <div className="card vh-75">
            <h4 className="card-header">주문관리</h4>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === null
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("")}
                    role="button"
                    style={{
                      cursor: statusFilter === null ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">전체 주문</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount(null)}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "출고준비"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("출고준비")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "출고준비" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">출고 준비</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("출고준비")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "해외입고"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("해외입고")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "해외입고" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">해외 입고</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("해외입고")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "검수필요"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("검수필요")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "검수필요" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">검수 필요</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("검수필요")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "국내출고"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("국내출고")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "국내출고" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">국내 출고</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("국내출고")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "세관입고"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("세관입고")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "세관입고" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">세관 입고</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("세관입고")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "배송완료"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("배송완료")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "배송완료" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">배송 완료</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("배송완료")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-custom-1 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "주문취소"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("주문취소")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "주문취소" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">주문 취소</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getOrderCount("주문취소")}
                    </h3>
                  </div>
                </div>
              </div>

              {/* 검색 및 필터 영역 */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center">
                    <div className="d-flex justify-content-start">
                      <div
                        className={`form-check custom-option custom-option-basic ${
                          isChecked ? "checked" : ""
                        }`}
                      >
                        <label
                          className="form-check-label custom-option-content"
                          htmlFor="customCheckTemp3"
                          style={{
                            paddingTop: "5px",
                            paddingLeft: "45px",
                            paddingBottom: 0,
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="customCheckTemp3"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <span className="custom-option-header">
                            <span className="h6 mb-0">전체선택</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-5">
                      <div className="d-flex gap-2 align-items-center">
                        <input
                          type="date"
                          className="form-control"
                          style={{ width: "150px" }}
                        />
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <input
                          type="date"
                          className="form-control"
                          style={{ width: "150px" }}
                        />
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type="text"
                          className="form-control"
                          id="basic-icon-default-fullname"
                          placeholder="검색어"
                          aria-label="검색어"
                          aria-describedby="basic-icon-default-fullname2"
                        />
                        <span
                          id="basic-icon-default-fullname2"
                          className="input-group-text"
                        >
                          <i className="icon-base bx bx-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주문 리스트 영역 */}
              <div
                className="mt-5 p-4"
                style={{
                  minHeight: "400px",
                  backgroundColor: "#f8fcff",
                  borderRadius: "10px",
                }}
              >
                <div className="row">
                  {/* 필터된 주문 리스트 */}
                  {sampleOrders
                    .filter(
                      (order) => !statusFilter || order.status === statusFilter
                    )
                    .map((order) => (
                      <div
                        key={order.id}
                        className="col-xl-6 col-lg-6 col-md-12 mb-3"
                      >
                        <div
                          className={`card h-100 border-2 cursor-pointer ${
                            selectedOrders.includes(order.id)
                              ? "border-primary shadow-sm"
                              : "border-light"
                          }`}
                          role="button"
                          tabIndex={0}
                          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            // 체크박스 클릭 시에는 모달을 열지 않음
                            if ((e.target as HTMLElement).closest('.order-checkbox')) {
                              return;
                            }
                            handleOrderClick(order);
                          }}
                          style={{
                            borderWidth: selectedOrders.includes(order.id)
                              ? "3px"
                              : "1px",
                            borderStyle: "solid",
                            borderColor: selectedOrders.includes(order.id)
                              ? "#007bff"
                              : "#e3e6f0",
                          }}
                        >
                          <div className="d-flex justify-content-between p-3 px-6">
                            <div className="d-flex justify-content-start align-items-center gap-4">
                              {/* 선택 체크박스 */}
                              <div className="order-checkbox">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedOrders.includes(order.id)}
                                  onChange={() => handleOrderSelect(order.id)}
                                  style={{ transform: "scale(1.2)" }}
                                />
                              </div>
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
                            <div className="col-3">
                              <img
                                src={order.image}
                                width="108"
                                height="108"
                                className="rounded-2"
                                alt={order.productName}
                              />
                            </div>
                            <div className="col-9">
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
                            <div
                              className="alert text-dark alert-primary alert-dismissible py-3 mx-5"
                              role="alert"
                            >
                              <span>{order.note}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* 선택된 주문이 있을 때만 하단 버튼 표시 */}
                {selectedOrders.length > 0 && (
                  <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-center">
                      <div
                        className="d-flex gap-3 px-4 py-3 align-items-center"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "25px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          display: "inline-flex",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-lg px-4"
                          onClick={handleSelectCancel}
                        >
                          선택 해제
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg px-4"
                          onClick={handleOrdersDelete}
                        >
                          주문 취소
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주문 상세 모달 */}
      <OrderDetailModal
        isOpen={isOrderModalOpen}
        onClose={handleOrderModalClose}
        order={selectedOrder}
      />
    </>
  );
}
