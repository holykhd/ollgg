
export default function Home() {
  return (
    <div className="row text-nowrap">
      <div className="col-12">
        <div className="card vh-75 position-relative">
          <h4 className="card-header">HOME</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-primary text-dark">
                    <span className="text-start">신규 견적</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-primary text-dark">
                    <span className="text-start">신규 코멘트</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-warning text-dark">
                    <span className="text-start">국내 출고</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-warning text-dark">
                    <span className="text-start">배송 완료</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-warning text-dark">
                    <span className="text-start">KC인증 필요</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-warning text-dark">
                    <span className="text-start">주문 불가</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-primary text-dark">
                    <span className="text-start">클레임</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-primary text-dark">
                    <span className="text-start">정산 예정</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-primary text-dark">
                    <span className="text-start">정산 완료</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-xl-3 order-0">
                <a href="#">
                  <div className="alert alert-warning text-dark">
                    <span className="text-start">매니저 견적 검토</span>
                    <h3 className="alert-heading mb-1 text-end">1</h3>
                  </div>
                </a>
              </div>
            </div>
            <div className="row content-bottom">
              <div className="col-lg-6 col-xl-4 order-0">
                <a href="#">
                  <div className="alert alert-secondary text-dark">
                    <span className="text-start">전 월 매출액</span>
                    <h3 className="alert-heading mb-1 text-end">
                      10,334,600
                    </h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-4 order-0">
                <a href="#">
                  <div className="alert alert-secondary text-dark">
                    <span className="text-start">당 월 매출액</span>
                    <h3 className="alert-heading mb-1 text-end">
                      18,000,000
                    </h3>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-xl-4 order-0">
                <a href="#">
                  <div className="alert alert-secondary text-dark">
                    <span className="text-start">정산 예정 금액</span>
                    <h3 className="alert-heading mb-1 text-end text-primary">
                      26,000,000
                    </h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
