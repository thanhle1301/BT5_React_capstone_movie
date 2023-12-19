import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";

export default function BookingTicket() {
  let params = useParams();
  console.log("😃 params:", params);

  const [thongTinDatVe, setThongTinDatVe] = useState({});
  const [gheDuocChon, setGheDuocChon] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [giaVe, setGiaVe] = useState(0);

  useEffect(() => {
    https
      .get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      )
      .then((res) => {
        console.log("😃 - BookingTicket", res);
        setThongTinDatVe(res.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const chairs = thongTinDatVe.danhSachGhe?.map((gheNgoi, index) => {
    const mauSac =
      gheNgoi.loaiGhe === "Thuong" ? "rgba(128, 128, 128, 0.5)" : "orange"; // điều kiện để pb màu ghế vip & thường
    const isHovered = hoveredSeat === index; // tao ush để theo index số thứ tự của cái ghế cái hover dưới

    return (
      <div
        key={index}
        className={` rounded w-9 h-9 my-1 text-center justify-center items-center font-bold  ${
          isHovered ? "bg-gray-100" : ""
        }`} // tao ra biến khi hover sẽ chuyển màu
        onMouseEnter={() => setHoveredSeat(index)}
        onMouseLeave={() => setHoveredSeat(null)}
        style={{
          display: "inline-flex ",

          flexDirection: "row",
          marginRight: 10,
          background: mauSac,
        }}
      >
        {gheNgoi.tenGhe}
      </div>
    );
  });

  return (
    <div className="flex container ">
      <div className="w-2/3">{chairs}</div>
      <div className="w-1/3">
        <div className="px-10 border-2 font-semibold text-">
          <p className="flex justify-between py-3">
            <span className="  ">Cụm rạp:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.tenCumRap}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Địa chỉ:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.diaChi}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Rạp:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.tenRap}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Ngày chiếu:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.ngayChieu}
            </span>
          </p>
          <hr className="border-1" />

          <p className="flex justify-between py-3">
            <span className=" ">Giờ chiếu:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.gioChieu}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Tên phim:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.tenPhim}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Chọn:</span>
            <span></span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className=" ">Giá vé:</span>
            <span></span>
          </p>
          <hr className="border-1" />
        </div>
        <button className="bt btn-warning w-100 mt-1">Đặt vé</button>
      </div>
    </div>
  );
}
