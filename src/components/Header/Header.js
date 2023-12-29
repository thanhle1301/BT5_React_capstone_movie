import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigative = useNavigate();

  let user = useSelector((state) => state.userReducer.user);

  let renderMenu = () => {
    if (user) {
      return (
        <>
          <span
            onClick={() => {
              navigative("/account");
            }}
            style={{
              cursor: "pointer",
            }}
          >
            {user.hoTen}
          </span>
          <button
            className="btn-theme"
            onClick={() => {
              window.location.href = "/";
              //  clear data user localStorage
              localStorage.removeItem("USER_INFO");
            }}
          >
            Đăng xuất
          </button>
        </>
      );
    } else {
      return (
        <div className="space-x-2  ">
          <button
            className="btn-theme ml-10"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Đăng nhập
          </button>
          <button
            className="btn-theme "
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Đăng ký
          </button>
        </div>
      );
    }
  };
  return (
    <div className="h-20 ">
      <div className="header_1 h-20">
        <div className="  flex items-center justify-between h-20 ">
          <span
            onClick={() => {
              navigative("/");
            }}
            className="font-medium text-red-500 text-4xl animate-pulse cursor-pointer ml-10"
          >
            CyberFlix
          </span>
          <div className="space-x-5 mr-10">{renderMenu()}</div>
        </div>
      </div>
    </div>
  );
}
