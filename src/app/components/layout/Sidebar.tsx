"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // 메뉴 아이템들을 배열로 정의
  const topMenuItems = [
    {
      href: "/quote-list",
      icon: "bx bxs-calculator",
      label: "견적 관리",
    },
    {
      href: "/order-list",
      icon: "bx bxs-cabinet",
      label: "주문 관리",
    },
    {
      href: "/comment-list",
      icon: "bx bxs-message-dots",
      label: "코멘트 관리",
    },
    {
      href: "/payment-list",
      icon: "bx bxs-credit-card",
      label: "결제 내역",
    },
  ];
  const bottomMenuItems = [
    {
      href: "/quote-request", // 경로 변경
      icon: "bx bxs-pencil",
      label: "견적 요청",
    },
  ];

  // 현재 경로와 메뉴 경로가 일치하는지 확인하는 함수
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <div className="col-md-12 col-xl-3 col-lg-2 order-0 order-md-1 mb-3">
      <div className="card mb-3">
        <div className="d-flex justify-content-start align-items-center p-3 gap-5">
          <Image
            className="img-fluid rounded"
            src="/assets/img/avatar.png"
            width={48}
            height={48}
            alt="avatar"
          />
          <div className="customer-info text-start">
            <h5 className="mb-0">주식회사 뉴프렌즈</h5>
            <span className="text-body-secondary">newf@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body">
          <div className="d-flex justify-content-between flex-column mb-4 mb-md-0">
            <ul className="nav nav-align-left nav-pills flex-column">
              {topMenuItems.map((item, index) => (
                <li className="nav-item mb-1" key={index}>
                  <Link
                    className={`nav-link ${
                      isActive(item.href) ? "active" : ""
                    }`}
                    href={item.href}
                  >
                    <i
                      className={`icon-base ${item.icon} icon-18px me-1_5`}
                    ></i>
                    <span className="align-middle">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-body">
          <div className="d-flex justify-content-between flex-column mb-4 mb-md-0">
            <ul className="nav nav-align-left nav-pills flex-column">
              {bottomMenuItems.map((item, index) => (
                <li className="nav-item mb-1" key={index}>
                  <Link
                    className={`nav-link ${
                      isActive(item.href) ? "active" : ""
                    }`}
                    href={item.href}
                  >
                    <i
                      className={`icon-base ${item.icon} icon-18px me-1_5`}
                    ></i>
                    <span className="align-middle">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
