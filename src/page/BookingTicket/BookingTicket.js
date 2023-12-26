import React, { useEffect, useState } from "react";
import { https } from "../../service/config";
import { useNavigate, useParams } from "react-router-dom";
import DoneBooking from "./DoneBooking";

export default function BookingTicket() {
  let navigate = useNavigate();
  let params = useParams();
  const [thongTinDatVe, setThongTinDatVe] = useState({});
  const [gheDuocChon, setGheDuocChon] = useState([]);

  useEffect(() => {
    https
      .get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      )
      .then((res) => {
        console.log(
          "😃 - file: BookingTicket.js:13 - .then - res:",
          res.data.content
        );
        setThongTinDatVe(res.data.content);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  // chọn or bỏ chọn ghế
  const handleSeatClick = (index) => {
    const updateGheNgoi = [...gheDuocChon];
    const indexGheNgoi = updateGheNgoi.indexOf(index);
    if (indexGheNgoi !== -1) {
      updateGheNgoi.splice(indexGheNgoi, 1);
    } else {
      updateGheNgoi.push(index);
    }
    setGheDuocChon(updateGheNgoi);
  };

  return (
    <div className="flex container">
      <div className="w-2/3 ">
        {thongTinDatVe.danhSachGhe?.map((dsGhe, index) => {
          const colorChair =
            dsGhe.loaiGhe === "Thuong" ? "rgba(128, 128, 128, 0.3)" : "orange";
          const isSelected = gheDuocChon.includes(index);
          return (
            <div
              key={index}
              className="rounded font-bold justify-center items-center my-1 w-9 h-9 hover:bg-white"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                marginRight: 10,
                background: isSelected ? "green" : colorChair,
                cursor: "pointer",
              }}
              onClick={() => {
                handleSeatClick(index);
              }}
            >
              {dsGhe.tenGhe}
            </div>
          );
        })}
      </div>
      <div className="w-1/3">
        <DoneBooking thongTinDatVe={thongTinDatVe} gheDuocChon={gheDuocChon} />
      </div>
    </div>
  );
}
