import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { https2 } from "../../../service/config";

export default function BookedAccount() {
  let navigative = useNavigate();
  const [booked, setBooked] = useState(true);
  const showModal = () => {
    setBooked(true);
  };
  useEffect((dataInfo) => {
    https2
      .post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`, dataInfo)
      .then((res) => {
        console.log("😃 - file: BookedAccount.js:13 - https2.post - res:", res);
      })
      .catch((err) => {
        console.log("😃 - file: BookedAccount.js:15 - https2.post - err:", err);
      });
  }, []);

  const handleCancel = () => {
    setBooked(navigative("/"));
  };
  return (
    <div>
      <Modal className="w-100" open={booked} onCancel={handleCancel}>
        <h1 className="text-2xl font-bold">Lịch sử đặt vé</h1>
        <div>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Modal>
    </div>
  );
}
