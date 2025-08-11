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

interface QuoteItemProps {
  quote: Quote;
  onClick?: (quote: Quote) => void;
  isSelected?: boolean;
  onSelect?: (quoteId: string) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote, onClick, isSelected = false, onSelect }) => {
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 체크박스 클릭 시에는 모달을 열지 않음
    if ((e.target as HTMLElement).closest('.quote-checkbox')) {
      return;
    }
    
    if (onClick) {
      onClick(quote);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(quote.id);
    }
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
        <div
          className={`card h-100 border-2 cursor-pointer ${
            isSelected ? 'border-primary shadow-sm' : 'border-light'
          }`}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (onClick) {
                onClick(quote);
              }
            }
          }}
          style={{
            borderWidth: isSelected ? '3px' : '1px',
            borderStyle: 'solid',
            borderColor: isSelected ? '#007bff' : '#e3e6f0'
          }}
        >
          <div className="d-flex justify-content-between p-3 px-6">
            <div className="d-flex justify-content-start align-items-center gap-4">
              {/* 선택 체크박스 */}
              <div className="quote-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isSelected}
                  onChange={handleSelectChange}
                  style={{ transform: 'scale(1.2)' }}
                />
              </div>
              <h5 className="mb-1">
                <strong>{quote.id}</strong>
              </h5>
              <span className="badge bg-label-primary mb-1">
                {quote.status}
              </span>
            </div>
            <h6 className="mb-1 text-secondary">{quote.createdAt}</h6>
          </div>
          <div className="d-flex align-items-start row px-5 mb-3">
            <div className="col-3">
              <img
                src={quote.image}
                width="108"
                height="108"
                className="rounded-2"
                alt={quote.productName}
              />
            </div>
            <div className="col-9">
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
            <div
              className="alert text-dark alert-primary alert-dismissible py-3 mx-5"
              role="alert"
            >
              <span>{quote.note}</span>
            </div>
          )}
        </div>
    </div>
  );
};

export default QuoteItem;
