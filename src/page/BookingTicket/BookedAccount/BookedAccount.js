import React, { useEffect, useState } from "react";
import { https2 } from "../../../service/config";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TURN_OFF, TURN_ON } from "../../../redux/constant/spinner";

export default function BookedAccount() {
  let dispatch = useDispatch();

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: TURN_ON,
    });
    https2
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        console.log("😃 - file: BookedAccount.js:80 - .then - res:", res);
        setUser(res.data.content);
        dispatch({
          type: TURN_OFF,
        });
      })
      .catch((err) => {
        dispatch({
          type: TURN_OFF,
        });
        console.log(err);
      });
  }, []);

  return (
    <div className="bg_movie">
      <div className="bg_movie_2">
        <div className="p-10"></div>
        <div className="table_history">
          <div className="flex justify-between">
            <h1 className="text-2xl">Lịch sử đặt vé</h1>
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/");
              }}
            >
              Thoát
            </button>
          </div>

          <hr className="my-4" />
          <div className="row text-base font-medium">
            {user.thongTinDatVe?.map((item, index) => (
              <Tooltip
                title={`Số ghế bạn đặt: ${item.danhSachGhe
                  .map((ghe, gheIndex) => ghe.tenGhe)
                  .join(", ")} `}
                key={index}
              >
                <div
                  className="col-lg-6 col-12  pr-20"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <p>Ngày đặt: {item.ngayDat}</p>
                  <p className="text-red-500 text-lg">
                    Tên phim: {item.tenPhim}
                  </p>
                  <p>Thời lượng phim: {item.thoiLuongPhim} phút</p>
                  <p className="text-green-600 text-lg">
                    {item.danhSachGhe[0]?.tenHeThongRap}
                  </p>
                  <p>
                    Ghế đã đặt:{" "}
                    {item.danhSachGhe
                      .map((ghe, gheIndex) => ghe.tenGhe)
                      .join(", ")}
                  </p>
                  <hr className="my-2" />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
