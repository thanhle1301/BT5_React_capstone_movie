import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import DoneBooking from "./DoneBooking";

export default function BookingTicket() {
  let params = useParams();

  const [thongTinDatVe, setThongTinDatVe] = useState({});
  const [gheDuocChon, setGheDuocChon] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  useEffect(() => {
    https
      .get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      )
      .then((res) => {
        console.log("😃 - BookingTicket", res.data.content);
        setThongTinDatVe(res.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const selectedGheNgoi = gheDuocChon.map(
    // tạo 1 biến, map ra từ mảng gheDuocChon ( chứa các vị trí duoc chọn, giá vé)
    (index) => thongTinDatVe.danhSachGhe[index]
  );
  // giá vé + lại vs nhau
  const totalGiaVe = selectedGheNgoi.reduce(
    (sum, index) => sum + index.giaVe,
    0
  );
  const chairs = thongTinDatVe.danhSachGhe?.map((gheNgoi, index) => {
    const mauSac =
      gheNgoi.loaiGhe === "Thuong" ? "rgba(128, 128, 128, 0.5)" : "orange"; // điều kiện để pb màu ghế vip & thường
    const isHovered = hoveredSeat === index; // tao ush để theo index số thứ tự của cái ghế cái hover dưới
    const isSelected = gheDuocChon.includes(index);

    const handleSeatClick = (index) => {
      // Toggle seat selection
      const updateGheNgoi = [...gheDuocChon]; // Sử dụng cú pháp spread, tạo bản sao mới của mảng
      const indexGheNgoi = updateGheNgoi.indexOf(index); // Tìm vị trí của vị trí đó trong updateGheNgoi
      if (indexGheNgoi !== -1) {
        // nếu vị trí indexGheNgoi # -1 - nghĩa là có rồi
        updateGheNgoi.splice(indexGheNgoi, 1); // nếu có rồi sẽ xóa (vị trí cần xóa, xóa 1 cái)
      } else {
        updateGheNgoi.push(index); // nếu = -1, chưa có, push vào mảng upatGheNgoi
      }
      setGheDuocChon(updateGheNgoi); // => gheDuocChon
    };

    return (
      <div
        key={index}
        className={` rounded w-9 h-9 my-1 text-center justify-center items-center font-bold  ${
          isHovered ? "bg-gray-100" : isSelected ? "bg-green-500" : ""
        }`} // tao ra biến khi hover sẽ chuyển màu
        onMouseEnter={() => setHoveredSeat(index)}
        onMouseLeave={() => setHoveredSeat(null)}
        onClick={() => {
          handleSeatClick(index);
        }}
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
        <div className="px-10 border-2 rounded font-semibold text-">
          <p className="flex justify-between py-3">
            <span className="w-50">Cụm rạp:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.tenCumRap}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className="w-50 ">Địa chỉ:</span>
            <span className="text-green-500 text-right">
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
            <span className="w-50 ">Tên phim:</span>
            <span className="text-green-500">
              {thongTinDatVe.thongTinPhim?.tenPhim}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className="w-36 ">Chọn vị trí:</span>
            <span className="w-64 text-right">
              {selectedGheNgoi.map((index) => index.tenGhe).join(", ")}
            </span>
          </p>
          <hr className="border-1" />
          <p className="flex justify-between py-3">
            <span className="w-50">Giá vé:</span>
            <span>
              {totalGiaVe.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
        </div>
        <div>
          <DoneBooking maLichChieu={params.maLichChieu} />
        </div>
      </div>
    </div>
  );
}
// thongTinDatVe={thongTinDatVe}
//             gheDuocChon={gheDuocChon}
//             done_tenCumRap={thongTinDatVe.thongTinPhim?.tenCumRap}
//             done_diaChi={thongTinDatVe.thongTinPhim?.diaChi}
//             done_tenRap={thongTinDatVe.thongTinPhim?.tenRap}
//             done_ngayChieu={thongTinDatVe.thongTinPhim?.ngayChieu}
//             done_gioChieu={thongTinDatVe.thongTinPhim?.gioChieu}
//             done_tenPhim={thongTinDatVe.thongTinPhim?.tenPhim}
//             done_gheDaChon={selectedGheNgoi
//               .map((index) => index.tenGhe)
//               .join(", ")}
//             done_giaVe={totalGiaVe.toLocaleString("vi-VN", {
//               style: "currency",
//               currency: "VND",
//             })}
