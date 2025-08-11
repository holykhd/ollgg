import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between mb-6 text-center text-sm-start gap-2">
      <div className="mb-2 mb-sm-0">
        <h4 className="mb-1">
          <Image
            src="/assets/img/logo.png"
            alt="올끝 로고"
            width={130}
            height={36}
            priority
          />
        </h4>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <div className="avatar">
          <Image
            src="/assets/img/top-right-btn1.png"
            alt="상단 버튼 1"
            width={38}
            height={38}
          />
        </div>
        <div className="avatar">
          <Image
            src="/assets/img/top-right-btn2.png"
            alt="상단 버튼 2"
            width={38}
            height={38}
          />
        </div>
        <div className="avatar">
          <Image
            src="/assets/img/avatar.png"
            alt="아바타"
            className="rounded-circle"
            width={38}
            height={38}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
