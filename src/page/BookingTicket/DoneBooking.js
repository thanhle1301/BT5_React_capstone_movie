import React, { useEffect, useState } from "react";
import { https } from "../../service/config";

export default function DoneBooking({ maLichChieu }) {
  console.log(
    "😃 - file: DoneBooking.js:5 - DoneBooking - maLichChieu:",
    maLichChieu
  );
  const [datVe, setDatVe] = useState({
    maLichChieu: 44364,
    danhSachVe: [
      {
        maGhe: 59401,
        giaVe: 75000,
      },
    ],
  });
  useEffect(() => {
    https
      .post(`/api/QuanLyDatVe/DatVe`, datVe)
      .then((res) => {
        console.log("DoneBooking post - res:", res);
      })
      .catch((err) => {
        console.log("DoneBooking post - err:", err);
      });
  }, []);
  const handleClickDatVe = () => {
    setDatVe();
  };
  return (
    <div>
      <button onClick={handleClickDatVe} className="btn btn-warning w-100 ">
        Đặt vé
      </button>
    </div>
  );
}
