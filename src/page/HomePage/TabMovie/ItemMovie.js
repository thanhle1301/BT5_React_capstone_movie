import moment from "moment";
import React from "react";

export default function ItemMovie({ data }) {
  return (
    <div className="flex space-x-5">
      <img className="w-32 h-48 object-cover" src={data.hinhAnh} alt="" />
      <div>
        <h2 className="text-2xl font-bold mb-2">{data.tenPhim}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  2xl:grid-cols-5  gap-5">
          {data.lstLichChieuTheoPhim.slice(0, 16).map((lichChieu) => {
            return (
              <button className="border border-gray-200 bg-gray-100 rounded p-1">
                <span
                  className="text-green-600 font-medium  "
                  key={lichChieu.maLichChieu}
                >
                  {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-YYYY ")}
                </span>
                <span>~</span>
                <span
                  className="text-red-600 font-medium  text-base"
                  key={lichChieu.maLichChieu}
                >
                  {moment(lichChieu.ngayChieuGioChieu).format(" hh:mm")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}