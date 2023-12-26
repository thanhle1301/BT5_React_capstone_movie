import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { https2 } from "../../../service/config";

export default function BookedAccount() {
  let navigative = useNavigate();
  const [booked, setBooked] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  const showModal = () => {
    setBooked(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ localStorage
        const storedData = localStorage.getItem("USER_BOOK");
        // Kiểm tra xem dữ liệu có tồn tại hay không
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log(parsedData);
          // Cập nhật trạng thái với dữ liệu từ localStorage
          setBookingData(parsedData);
          // Gọi API bằng https2 để có dữ liệu mới nhất
          const response = await https2.post(
            `/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
            parsedData.dataToServer
          );
          console.log("Dữ liệu từ API:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchData();
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
