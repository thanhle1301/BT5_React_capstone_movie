import moment from "moment";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ItemMovie({ data }) {
  let navigate = useNavigate();

  return (
    <div className="sm:flex sm:space-x-5">
      <img
        className="sm:w-32 w-10  sm:h-48 h-14 object-cover"
        src={data.hinhAnh}
        alt=""
      />
      <div>
        <h2 className="sm:text-2xl text-base   font-bold mb-2">
          {data.tenPhim}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  2xl:grid-cols-5  gap-5">
          {data.lstLichChieuTheoPhim.slice(0, 16).map((lichChieu) => {
            return (
              <div key={lichChieu.maLichChieu}>
                <NavLink
                  to={`/booking/${lichChieu.maLichChieu}`}
                  className="border border-gray-200 bg-gray-100 rounded p-1"
                >
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
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
