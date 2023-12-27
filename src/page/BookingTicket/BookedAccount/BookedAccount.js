import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { https2 } from "../../../service/config";
import { useSelector } from "react-redux";

export default function BookedAccount() {
  let navigative = useNavigate();
  let user = useSelector((state) => state.userReducer.user);

  const [booked, setBooked] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      const storedData = localStorage.getItem("USER_BOOK");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);

        const values = {
          user,
          thongTinDatVe: parsedData.dataToServer || [],
        };

        const fetchAPI2 = () => {
          https2
            .post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`, values)
            .then((res) => {
              console.log(
                "😃 - file: BookedAccount.js:18 - .then - result:",
                values
              );
            })
            .catch((err) => {
              console.log(
                "😃 - file: BookedAccount.js:22 - useEffect - err:",
                err
              );
            });
        };

        fetchAPI2();
      }
    };

    fetchDataFromLocalStorage();
  }, []); // Empty dependency array to run the effect once on mount

  const handleCancel = () => {
    setBooked(false);
    navigative("/");
  };

  return (
    <div>
      <Modal className="w-100" open={booked} onCancel={handleCancel}>
        <h1 className="text-2xl font-bold">Lịch sử đặt vé</h1>
        <div>
          <p>
            <span>Ngày đặt</span>
            <span></span>
          </p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Modal>
    </div>
  );
}
