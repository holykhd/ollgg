"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import {
  QuoteDetailModal,
  QuoteItem,
  PaymentModal,
  CancelModal,
} from "../components";
import { CommentDetailModal } from "../components/comment";

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

export default function QuoteListPage() {
  const [isChecked, setIsChecked] = useState(false); // 초기값을 false로 변경
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]); // 선택된 견적들 관리
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // 상태 필터
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      // 전체 선택 - 현재 필터된 견적 ID들만 selectedQuotes에 추가
      const filteredQuoteIds = sampleQuotes
        .filter((quote) => !statusFilter || quote.status === statusFilter)
        .map((quote) => quote.id);
      setSelectedQuotes(filteredQuoteIds);
    } else {
      // 전체 해제 - selectedQuotes 비우기
      setSelectedQuotes([]);
    }
  };

  const handleQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote);
    if (statusFilter === "견적취소") {
      setIsCancelModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuote(null);
  };

  const handleQuoteSelect = (quoteId: string) => {
    setSelectedQuotes((prev) => {
      if (prev.includes(quoteId)) {
        // 이미 선택된 경우 제거
        const newSelected = prev.filter((id) => id !== quoteId);
        // 모든 선택이 해제되면 전체 선택 체크박스도 해제
        if (newSelected.length === 0) {
          setIsChecked(false);
        }
        return newSelected;
      } else {
        // 선택되지 않은 경우 추가
        const newSelected = [...prev, quoteId];
        // 현재 필터된 모든 견적이 선택되면 전체 선택 체크박스 활성화
        const filteredQuotes = sampleQuotes.filter(
          (quote) => !statusFilter || quote.status === statusFilter
        );
        if (newSelected.length === filteredQuotes.length) {
          setIsChecked(true);
        }
        return newSelected;
      }
    });
  };

  const handleSelectCancel = () => {
    setSelectedQuotes([]);
    setIsChecked(false);
  };

  const handleQuotesDelete = () => {
    // 견적 취소 로직 (현재는 선택 해제만)
    setSelectedQuotes([]);
    setIsChecked(false);
  };

  // 상태별 필터링 함수
  const handleStatusFilter = (status: string) => {
    // 이미 활성화된 버튼 클릭 시 아무 작업하지 않음
    if (status === "" && statusFilter === null) {
      return; // 전체 견적이 이미 활성화된 상태
    }
    if (status !== "" && statusFilter === status) {
      return; // 해당 상태가 이미 활성화된 상태
    }

    if (status === "") {
      // 전체 견적 버튼 클릭 시
      setStatusFilter(null);
    } else {
      // 다른 상태 버튼 클릭 시
      setStatusFilter(status);
    }
    setSelectedQuotes([]);
    setIsChecked(false);
  };

  // 선택된 견적들의 총 금액 계산
  const calculateTotalPrice = () => {
    return selectedQuotes.reduce((total, quoteId) => {
      const quote = sampleQuotes
        .filter((q) => !statusFilter || q.status === statusFilter)
        .find((q) => q.id === quoteId);
      return total + (quote?.price || 0);
    }, 0);
  };

  // 합배송 처리 함수
  const handleCombinedShipping = () => {
    alert("합배송이 신청되었습니다.");
  };

  // 바로 결제 처리 함수
  const handleDirectPayment = () => {
    setIsPaymentModalOpen(true);
  };

  // 결제 모달 닫기 함수
  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  // 취소 모달 닫기 함수
  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
    setSelectedQuote(null);
  };

  // 샘플 견적 데이터 배열
  const sampleQuotes: Quote[] = [
    {
      id: "#A034_12804",
      status: "견적요청",
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
      id: "#A034_12805",
      status: "견적요청",
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
      id: "#A034_12806",
      status: "견적확인중",
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
      id: "#A034_12807",
      status: "견적확인중",
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
      id: "#A034_12808",
      status: "견적완료",
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
      id: "#A034_12809",
      status: "결제완료",
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
      id: "#A034_12810",
      status: "결제완료",
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
      id: "#A034_12811",
      status: "결제완료",
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
    {
      id: "#A034_12812",
      status: "견적취소",
      createdAt: "2025.07-14 13:15:45",
      image: "/assets/img/product-img.png",
      productName: "Ergonomic Chair",
      type: "B2C",
      options: "블루, 메시타입, 100개",
      isCustom: true,
      desiredDelivery: "2주 이내",
      note: "사양 변경으로 인한 취소",
      price: 3250000,
    },
  ];

  // 상태별 견적 수 계산
  const getQuoteCount = (status: string | null) => {
    if (status === null) {
      return sampleQuotes.length; // 전체 견적
    }
    return sampleQuotes.filter((quote) => quote.status === status).length;
  };

  return (
    <>
      <div className="row text-nowrap">
        <div className="col-12">
          <div className="card vh-75">
            <h4 className="card-header">견적관리</h4>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-xl-2 order-0">
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
                    <span className="text-start">전체 견적</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount(null)}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "견적요청"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("견적요청")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "견적요청" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">견적 요청</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount("견적요청")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "견적확인중"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("견적확인중")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "견적확인중" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">견적 확인중</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount("견적확인중")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "견적완료"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("견적완료")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "견적완료" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">견적 완료</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount("견적완료")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "결제완료"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("결제완료")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "결제완료" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">결제 완료</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount("결제완료")}
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 col-xl-2 order-0">
                  <div
                    className={`alert ${
                      statusFilter === "견적취소"
                        ? "bg-primary text-white"
                        : "bg-label-primary text-dark cursor-pointer"
                    }`}
                    onClick={() => handleStatusFilter("견적취소")}
                    role="button"
                    style={{
                      cursor:
                        statusFilter === "견적취소" ? "default" : "pointer",
                    }}
                  >
                    <span className="text-start">견적 취소</span>
                    <h3 className="alert-heading mb-1 text-end">
                      {getQuoteCount("견적취소")}
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

              {/* 견적 리스트 영역 */}
              <div
                className="mt-5 p-4"
                style={{
                  minHeight: "400px",
                  backgroundColor: "#f8fcff",
                  borderRadius: "10px",
                }}
              >
                <div className="row">
                  {/* QuoteItem 컴포넌트 리스트 */}
                  {sampleQuotes
                    .filter(
                      (quote) => !statusFilter || quote.status === statusFilter
                    )
                    .map((quote) => (
                      <QuoteItem
                        key={quote.id}
                        quote={quote}
                        onClick={handleQuoteClick}
                        isSelected={selectedQuotes.includes(quote.id)}
                        onSelect={handleQuoteSelect}
                      />
                    ))}

                  {/* 빈 상태 표시 (필요시 사용) */}
                  {/* <div className="d-flex flex-column align-items-center">
                    <div className="mb-5">
                      <Image
                        src={"/assets/img/icon-empty-order.png"}
                        alt="견적 없음 아이콘"
                        width={72}
                        height={72}
                      />
                    </div>
                    <small className="text-light fw-medium">
                      등록된 견적이 없습니다.
                    </small>
                  </div> */}
                </div>
                {/* 선택된 견적이 있을 때만 하단 버튼 표시 */}
                {selectedQuotes.length > 0 && (
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
                          onClick={handleQuotesDelete}
                        >
                          {statusFilter === "견적취소"
                            ? "견적 삭제"
                            : "견적 취소"}
                        </button>

                        {/* 견적 완료 상태일 때만 합배송, 결제 금액, 바로 결제 버튼 표시 */}
                        {statusFilter === "견적완료" && (
                          <>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-lg px-4"
                              onClick={handleCombinedShipping}
                            >
                              합배송
                            </button>
                            <div className="d-flex align-items-center mx-3">
                              <span className="text-muted me-2">
                                결1제 금액:
                              </span>
                              <strong className="text-primary fs-5">
                                {calculateTotalPrice().toLocaleString()}원
                              </strong>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-lg px-4"
                              onClick={handleDirectPayment}
                            >
                              바로 결제
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 견적 상세 모달 */}
      <QuoteDetailModal
        quote={selectedQuote}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* 결제 모달 컴포넌트 */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        selectedQuotes={sampleQuotes
          .filter((quote) => !statusFilter || quote.status === statusFilter)
          .filter((quote) => selectedQuotes.includes(quote.id))}
        totalAmount={calculateTotalPrice()}
      />

      {/* 취소 모달 컴포넌트 */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelModalClose}
        quote={selectedQuote}
      />
    </>
  );
}
