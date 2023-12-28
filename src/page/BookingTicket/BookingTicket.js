import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { https } from "../../service/config";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { USER_INFO } from "../../redux/constant/user";
import Swal from "sweetalert2";

export default function BookingTicket() {
  let params = useParams();

  const [thongTinDatVe, setthongTinDatVe] = useState({});
  const [gheDuocChon, setgheDuocChon] = useState([]);
  console.log("booking :", thongTinDatVe, gheDuocChon);

  const fetchAPI = () => {
    https
      .get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      )
      .then((res) => {
        setthongTinDatVe(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  let user = useSelector((state) => state.userReducer.user);

  const handleBooking = async (payload) => {
    if (!localStorage.getItem(USER_INFO)) {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập, vui lòng đăng nhập",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
      }).then((result) => {
        if (result.isConfirmed) {
          return (window.location.href = "/login");
        }
      });
    } else {
      try {
        const response = await https.post("/api/QuanLyDatVe/DatVe", payload);
        if (response.status === 200) {
          message.success("Đặt vé thành công");

          setgheDuocChon([]);
          fetchAPI();
        }
      } catch (err) {
        message.error("Đặt vé thất bại");
      }
    }
  };

  const handleSelected = (chair) => {
    const findChair = gheDuocChon.find((ele) => ele.maGhe === chair.maGhe);

    if (findChair) {
      const filterData = gheDuocChon.filter((ele) => ele.maGhe !== chair.maGhe);
      setgheDuocChon(filterData);
    } else {
      setgheDuocChon([...gheDuocChon, chair]);
    }
  };
  let renderGhe = () => {
    return thongTinDatVe.danhSachGhe?.map((ghe, index) => {
      const colorChair =
        ghe.loaiGhe === "Thuong" ? "rgba(128, 128, 128, 0.2)" : "orange";
      const isSelected = gheDuocChon.some((chair) => chair.maGhe === ghe.maGhe);

      const isBooked = ghe.daDat;
      const isSeatSelectedOrBooked = isBooked;
      return (
        <div
          key={index}
          className="rounded font-bold justify-center items-center my-1 w-9 h-9 hover:bg-white"
          style={{
            display: "inline-flex",
            flexDirection: "row",
            marginRight: 10,
            background: isSelected
              ? "green"
              : isBooked
              ? "rgba(128, 128, 128, 0.7)"
              : colorChair,
            cursor: isBooked ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            handleSelected(ghe);
          }}
        >
          {isSeatSelectedOrBooked ? "X" : ghe.tenGhe}
        </div>
      );
    });
  };
  const totalGiaVe = gheDuocChon.reduce((tongTien, ghe, index) => {
    return (tongTien += ghe.giaVe);
  }, 0);

  return (
    <div className="container ">
      <div className="row">
        <div
          className="col-md-8 col-sm-12"
          style={{
            width: "100%",
            boxSizing: "border-box",
            display: "block",
          }}
        >
          <div className="w-100 border rounded border-orange-500 bg-orange-500 text-center py-3 mb-5 text-white text-bold text-3xl">
            MÀN HÌNH
          </div>
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              margin: "auto",
              display: "block",
            }}
          >
            {renderGhe()}
          </div>
          <div className="py-5 row">
            <div className="col-2">
              <span className="border border-3 rounded bg-orange-400 py-1 px-4 mb-1"></span>
              <p>Ghế vip</p>
            </div>
            <div className="col-2">
              <span
                className="border border-3 rounded  py-1 px-4 mb-1"
                style={{
                  background: "rgba(128, 128, 128, 0.2)",
                }}
              ></span>
              <p>Ghế thường</p>
            </div>
            <div className="col-2">
              <span
                className="border border-3 rounded  py-1 px-3 mb-1"
                style={{
                  background: "rgba(128, 128, 128, 0.7)",
                }}
              >
                X
              </span>
              <p>Ghế dã dặt</p>
            </div>
          </div>
        </div>

        <div className="  space-y-5 table_info_datve  col-md-4 col-sm-12 ">
          <div className="text-5xl text-center text-green-600  ">
            {totalGiaVe.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">Cụm Rạp</h3>
            <h3 className="md:text-base sm:text-sm font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenCumRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">Địa chỉ</h3>
            <h3 className="md:text-base sm:text-sm sm:ml-5 font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.diaChi}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">Rạp</h3>
            <h3 className="md:text-base sm:text-sm  font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">
              Ngày giờ chiếu:{" "}
            </h3>
            <h3 className="md:text-base sm:text-sm  font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.ngayChieu} ~{" "}
              <span className="text-red-500 font-medium md:text-base sm:text-sm ">
                {thongTinDatVe.thongTinPhim?.gioChieu}
              </span>
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">Tên phim: </h3>
            <h3 className="md:text-base sm:text-sm  font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenPhim}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="md:text-base sm:text-sm text-xs">Chọn: </h3>
            <div className="text-xl font-medium text-green-500 ml-10">
              {gheDuocChon.map((item, index) => {
                return (
                  <span style={{ fontSize: "20px" }} key={index}>
                    Ghế {item.tenGhe}
                  </span>
                );
              })}
            </div>
          </div>
          <hr />

          <div>
            <button
              onClick={() => {
                const payload = {
                  maLichChieu: thongTinDatVe?.thongTinPhim?.maLichChieu,
                  danhSachVe: gheDuocChon.map((chair) => ({
                    maGhe: chair.maGhe,
                    giaVe: chair.giaVe,
                  })),
                };

                handleBooking(payload);
              }}
              className="bg-orange-500 hover:bg-green-600 text-white py-3 w-full rounded md:text-3xl sm:text-xl "
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
