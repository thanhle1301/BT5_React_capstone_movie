import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // useNavigate dùng để điều hướng trang, không gấy reload
  let navigative = useNavigate();
  return (
    <div>
      <div className="container flex items-center justify-between h-20 ">
        <span
          onClick={() => {
            navigative("/");
          }}
          className="font-medium text-red-500 text-3xl"
        >
          CyberFlix
        </span>
        <button
          onClick={() => {
            navigative("/login");
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
