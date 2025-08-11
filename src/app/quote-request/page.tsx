"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

// Daum Postcode API 타입 선언
declare global {
  interface Window {
    daum: any;
  }
}

export default function QuoteRequestListPage() {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const [productInfo, setProductInfo] = useState({
    productName: "",
    referenceUrl: "",
    requirements: "",
    shippingAddress: "",
    category: "",
    quantity: "",
    description: "",
  });

  const [productImages, setProductImages] = useState<File[]>([]);

  // 상품 상세 정보 입력 필드
  const [currentSize, setCurrentSize] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");

  // 상품 상세 정보 테이블 데이터
  interface ProductDetail {
    id: number;
    size: string;
    color: string;
    quantity: string;
  }
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);

  // 커스텀 요청 상태
  const [isCustomRequest, setIsCustomRequest] = useState<boolean>(true);

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    desiredDate: "",
    method: "",
    recipientName: "",
    recipientPhone: "",
    requests: "",
  });

  const [requestInfo, setRequestInfo] = useState({
    desiredPrice: "",
    paymentMethod: "",
    additionalRequests: "",
    attachments: null as FileList | null,
  });

  useEffect(() => {
    const savedProductInfo = localStorage.getItem("quoteRequest_productInfo");
    const savedShippingInfo = localStorage.getItem("quoteRequest_shippingInfo");
    const savedRequestInfo = localStorage.getItem("quoteRequest_requestInfo");

    if (savedProductInfo) {
      setProductInfo(JSON.parse(savedProductInfo));
    }
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
    if (savedRequestInfo) {
      setRequestInfo({ ...JSON.parse(savedRequestInfo), attachments: null });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quoteRequest_productInfo",
      JSON.stringify(productInfo)
    );
  }, [productInfo]);

  useEffect(() => {
    localStorage.setItem(
      "quoteRequest_shippingInfo",
      JSON.stringify(shippingInfo)
    );
  }, [shippingInfo]);

  useEffect(() => {
    localStorage.setItem(
      "quoteRequest_requestInfo",
      JSON.stringify({ ...requestInfo, attachments: null })
    );
  }, [requestInfo]);

  // Daum Postcode API 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      const existingScript = document.querySelector(
        `script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // 주소 검색 함수
  const handleAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          let addr = "";

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 도로명 주소
            addr = data.roadAddress;
          } else {
            // 지번 주소
            addr = data.jibunAddress;
          }

          // 주소를 상태에 저장
          setProductInfo({
            ...productInfo,
            shippingAddress: addr,
          });

          // 모달이 닫힌 후 배송지 주소 입력 필드에 포커스 이동
          setTimeout(() => {
            const shippingAddressInput = document.getElementById("shipping-address") as HTMLInputElement;
            if (shippingAddressInput) {
              shippingAddressInput.focus();
              // 커서를 입력 필드의 끝으로 이동
              shippingAddressInput.setSelectionRange(
                shippingAddressInput.value.length,
                shippingAddressInput.value.length
              );
            }
          }, 100); // 모달이 완전히 닫힐 때까지 잠시 대기
        },
      }).open();
    } else {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // 상품 상세 정보 추가 함수
  const handleAddProductDetail = () => {
    // 수량만 필수 입력으로 검증
    if (!currentQuantity.trim()) {
      alert("수량을 입력해주세요.");
      return;
    }

    if (parseInt(currentQuantity) <= 0) {
      alert("수량은 1 이상의 숫자를 입력해주세요.");
      return;
    }

    const newDetail: ProductDetail = {
      id: Date.now(),
      size: currentSize.trim() || "",
      color: currentColor.trim() || "",
      quantity: currentQuantity.trim(),
    };

    setProductDetails([...productDetails, newDetail]);

    // 입력 필드 초기화
    setCurrentSize("");
    setCurrentColor("");
    setCurrentQuantity("");
  };

  // 상품 상세 정보 삭제 함수
  const handleDeleteProductDetail = (id: number) => {
    setProductDetails(productDetails.filter((detail) => detail.id !== id));
  };

  // 숫자 포맷 함수 (천 단위 콤마 추가)
  const formatNumber = (num: number | string) => {
    const number = typeof num === "string" ? parseInt(num) || 0 : num;
    return number.toLocaleString();
  };

  // 총 수량 계산 함수
  const getTotalQuantity = () => {
    return productDetails.reduce((total, detail) => {
      return total + parseInt(detail.quantity || "0");
    }, 0);
  };

  // 필수 필드 검증 함수
  const validateRequiredFields = () => {
    // 상품명 검증
    if (!productInfo.productName.trim()) {
      alert("상품명은 필수 입력 항목입니다.");
      const productNameInput = document.getElementById("product-name");
      if (productNameInput) {
        productNameInput.focus();
      }
      return false;
    }

    // 배송지 주소 검증
    if (!productInfo.shippingAddress.trim()) {
      alert("배송지 주소는 필수 입력 항목입니다.");
      const shippingAddressInput = document.getElementById("shipping-address");
      if (shippingAddressInput) {
        shippingAddressInput.focus();
      }
      return false;
    }

    // 참고 이미지 검증
    if (productImages.length === 0) {
      alert("참고 이미지는 최소 1장 필수입니다.");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="row text-nowrap">
        <div className="col-12 mt-0">
          <div className="card vh-75">
            <div className="card-body">
              {activeMenuItem === 0 && (
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <span className="text-primary">01.</span> 상품 정보
                    </h4>
                    <div className="divider">
                      <div className="divider-text">상품 기본 정보</div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="product-name" className="form-label">
                        상품명 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-name"
                        placeholder="상품명"
                        value={productInfo.productName}
                        onChange={(e) =>
                          setProductInfo({
                            ...productInfo,
                            productName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="reference-url" className="form-label">
                        참고 URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reference-url"
                        placeholder="참고 URL을 입력하세요"
                        value={productInfo.referenceUrl}
                        onChange={(e) =>
                          setProductInfo({
                            ...productInfo,
                            referenceUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="requirements" className="form-label">
                        요청사항
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requirements"
                        placeholder="특별한 요청사항이 있으시면 입력해주세요"
                        value={productInfo.requirements}
                        onChange={(e) =>
                          setProductInfo({
                            ...productInfo,
                            requirements: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      {/* 주소 시작 */}
                      <div className="row g-4">
                        <label
                          htmlFor="shipping-address"
                          className="form-label"
                        >
                          배송지 주소 <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-10 col-8">
                          <input
                            type="text"
                            className="form-control"
                            id="shipping-address"
                            placeholder="주소찾기 버튼을 클릭하여 주소를 검색하세요"
                            value={productInfo.shippingAddress}
                            onChange={(e) =>
                              setProductInfo({
                                ...productInfo,
                                shippingAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-sm-2 col-4 d-grid">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddressSearch}
                          >
                            주소찾기
                          </button>
                        </div>
                      </div>
                      {/* 주소 종료 */}
                    </div>
                    <div className="divider">
                      <div className="divider-text">상품 이미지 정보</div>
                    </div>
                    <div className="mb-3 alert d-flex align-items-center bg-lighter mb-0 h6 flex-wrap gap-2 gap-sm-0">
                      <ImageUploader
                        maxImages={5}
                        label="참고 이미지 (최소 1장 필수)"
                        onImagesChange={setProductImages}
                        initialImages={productImages}
                      />
                    </div>
                    <div className="divider">
                      <div className="divider-text">상품 상세 정보</div>
                    </div>
                    <div className="row mb-6">
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="ecommerce-product-sku"
                        >
                          사이즈
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ecommerce-product-sku"
                          placeholder="사이즈를 입력하세요"
                          name="productSku"
                          aria-label="Product SKU"
                          value={currentSize}
                          onChange={(e) => setCurrentSize(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="ecommerce-product-barcode"
                        >
                          색상
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="ecommerce-product-barcode"
                          placeholder="색상을 입력하세요"
                          name="productBarcode"
                          aria-label="Product barcode"
                          value={currentColor}
                          onChange={(e) => setCurrentColor(e.target.value)}
                        />
                      </div>
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="ecommerce-product-barcode"
                        >
                          수량
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="ecommerce-product-quantity"
                          placeholder="수량을 입력하세요"
                          name="productQuantity"
                          aria-label="Product quantity"
                          value={currentQuantity}
                          onChange={(e) => setCurrentQuantity(e.target.value)}
                          min="1"
                        />
                      </div>
                      <div className="col text-center">
                        <button
                          className="btn btn-label-primary mt-6 w-100"
                          onClick={handleAddProductDetail}
                          type="button"
                        >
                          추가
                        </button>
                      </div>
                      <small className="text-body-secondary mt-3 mx-1">
                        사이즈와 색상이 없는 단일 상품의 경우에는 수량만
                        입력해서 추가해 주세요.
                      </small>
                    </div>
                    {/* 상품 수량 정보 시작 */}
                    <div className="card mb-4 shadow-none border border-top-0">
                      <div className="table-responsive text-nowrap rounded">
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ width: "35%" }}>사이즈</th>
                              <th style={{ width: "35%" }}>색상</th>
                              <th style={{ width: "20%" }}>수량</th>
                              <th
                                className="text-center"
                                style={{ width: "10%" }}
                              >
                                삭제
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {productDetails.length === 0 ? (
                              <tr className="border-transparent">
                                <td
                                  colSpan={4}
                                  className="text-center text-muted py-4"
                                >
                                  상품 상세 정보를 추가해주세요
                                </td>
                              </tr>
                            ) : (
                              productDetails.map((detail, index) => (
                                <tr
                                  key={detail.id}
                                  className={
                                    index === productDetails.length - 1
                                      ? "border-transparent"
                                      : ""
                                  }
                                >
                                  <td>{detail.size}</td>
                                  <td>{detail.color}</td>
                                  <td className="text-right">
                                    {formatNumber(detail.quantity)}개
                                  </td>
                                  <td className="text-center">
                                    <button
                                      className="btn btn-label-danger"
                                      onClick={() =>
                                        handleDeleteProductDetail(detail.id)
                                      }
                                      type="button"
                                    >
                                      <i className="icon-base bx bx-trash icon-md me-1"></i>
                                      삭제
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                            {/* 총 수량 합계 행 */}
                            {productDetails.length > 0 && (
                              <tr className="border-top-2 bg-light">
                                <td colSpan={3} className="text-end fw-bold">
                                  총 주문 수량:
                                </td>
                                <td className="fw-bold text-primary">
                                  {formatNumber(getTotalQuantity())}개
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* 상품 수량 정보 종료 */}
                    <div className="divider">
                      <div className="divider-text">제품 커스텀 정보</div>
                    </div>
                    <div className="d-flex justify-content-start align-item-center gap-4 mb-3">
                      <button
                        type="button"
                        className={`btn ${
                          isCustomRequest
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setIsCustomRequest(true)}
                      >
                        커스텀 요청
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          !isCustomRequest
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setIsCustomRequest(false)}
                      >
                        커스텀 안함
                      </button>
                    </div>

                    {isCustomRequest && (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="customRequestTextarea"
                            className="form-label"
                          >
                            커스텀 요청사항
                          </label>
                          <textarea
                            className="form-control"
                            id="customRequestTextarea"
                            rows={3}
                            placeholder="커스텀 요청사항을 자세히 입력해주세요"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="customRequestFile"
                            className="form-label"
                          >
                            첨부파일
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            id="customRequestFile"
                            multiple
                          />
                          <div className="form-text">
                            관련 자료나 참고 이미지를 첨부해주세요
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row mb-6">
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="ecommerce-product-sku"
                        >
                          희망 납기일
                        </label>
                        <select
                          className="form-select"
                          id="exampleFormControlSelect1"
                          aria-label="Default select example"
                        >
                          <option value="1">10일 이내</option>
                          <option value="2">14일 이내</option>
                          <option value="3">30일 이내</option>
                        </select>
                      </div>
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="ecommerce-product-barcode"
                        >
                          검수 옵션
                        </label>
                        <select
                          className="form-select"
                          id="exampleFormControlSelect1"
                          aria-label="Default select example"
                        >
                          <option value="1">무검수</option>
                          <option value="2">기본검수</option>
                          <option value="3">정밀검수</option>
                        </select>
                      </div>
                    </div>
                    <div className="divider">
                      <div className="divider-text">
                        견적 정보 확인 후 요청하기
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-lg btn-danger"
                        onClick={validateRequiredFields}
                      >
                        견적요청
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeMenuItem === 1 && (
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <span className="text-primary">02.</span> 배송 정보
                    </h4>
                    <div className="divider">
                      <div className="divider-text">기본 배송 정보</div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="html5-text-input"
                        className="col-md-2 col-form-label"
                      >
                        이름
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          value="이름을 입력해 주세요"
                          id="html5-text-input"
                        />
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="html5-text-input"
                        className="col-md-2 col-form-label"
                      >
                        연락처
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          value="연락처를 입력해 주세요"
                          id="html5-text-input"
                        />
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="html5-text-input"
                        className="col-md-2 col-form-label"
                      >
                        수령지
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          value="상품을 수령하실 주소를 입력해 주세요"
                          id="html5-text-input"
                        />
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="html5-text-input"
                        className="col-md-2 col-form-label"
                      >
                        희망 납기일
                      </label>
                      <div className="col-md-10">
                        <div className="row">
                          <div className="col-md mb-md-0 mb-5">
                            <div className="form-check form-check-primary mt-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="customCheckPrimary"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheckPrimary"
                              >
                                10일 이내
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 row">
                      <label
                        htmlFor="html5-text-input"
                        className="col-md-2 col-form-label"
                      >
                        검수 옵션
                      </label>
                      <div className="col-md-10">1, 2, 3,</div>
                    </div>
                  </div>
                </div>
              )}

              {activeMenuItem === 2 && (
                <div className="row">
                  <div className="col-12">
                    <h5>요청 사항</h5>
                    <div className="mb-3">
                      <label className="form-label">견적 희망가</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="희망하는 견적가를 입력하세요"
                        value={requestInfo.desiredPrice}
                        onChange={(e) =>
                          setRequestInfo({
                            ...requestInfo,
                            desiredPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">결제 방법</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="card"
                          value="카드결제"
                          checked={requestInfo.paymentMethod === "카드결제"}
                          onChange={(e) =>
                            setRequestInfo({
                              ...requestInfo,
                              paymentMethod: e.target.value,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="card">
                          카드결제
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="transfer"
                          value="계좌이체"
                          checked={requestInfo.paymentMethod === "계좌이체"}
                          onChange={(e) =>
                            setRequestInfo({
                              ...requestInfo,
                              paymentMethod: e.target.value,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="transfer">
                          계좌이체
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment"
                          id="cash"
                          value="현금결제"
                          checked={requestInfo.paymentMethod === "현금결제"}
                          onChange={(e) =>
                            setRequestInfo({
                              ...requestInfo,
                              paymentMethod: e.target.value,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="cash">
                          현금결제
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">추가 요청사항</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        placeholder="기타 요청사항이나 문의사항을 자유롭게 작성해주세요"
                        value={requestInfo.additionalRequests}
                        onChange={(e) =>
                          setRequestInfo({
                            ...requestInfo,
                            additionalRequests: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">첨부파일</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={(e) =>
                          setRequestInfo({
                            ...requestInfo,
                            attachments: e.target.files,
                          })
                        }
                      />
                      <div className="form-text">
                        관련 자료나 이미지 파일을 첨부해주세요
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
