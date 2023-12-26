import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // useNavigate dùng để điều hướng trang, không gấy reload
  let navigative = useNavigate();
  //  lấy dữ liệu từ redux về
  //  useSelector ~ mapStateToProps
  let user = useSelector((state) => state.userReducer.user);
  console.log("😃 - file: Header.js:12 - Header - user:", user);

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
        <div className="space-x-2">
          <button
            className="btn-theme"
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
    <div>
      <div className="container flex items-center justify-between h-20 ">
        <span
          onClick={() => {
            navigative("/");
          }}
          className="font-medium text-red-500 text-4xl animate-pulse"
        >
          CyberFlix
        </span>
        <div className="space-x-5">{renderMenu()}</div>
      </div>
      <div></div>
    </div>
  );
}
