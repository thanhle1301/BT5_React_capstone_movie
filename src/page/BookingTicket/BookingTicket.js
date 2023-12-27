import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { https2 } from "../../service/config";
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
    https2
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
        const response = await https2.post("/api/QuanLyDatVe/DatVe", payload);
        if (response.status === 200) {
          message.success("booking successfully!");

          setgheDuocChon([]);
          fetchAPI();
        }
      } catch (err) {
        message.error("booking faild please try again!");
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
      <div className="grid grid-cols-12 ">
        <div
          className=" col-span-8"
          style={{
            width: "90%",
            boxSizing: "border-box",
            display: "block",
          }}
        >
          <div
            style={{
              width: "79.9%",
              boxSizing: "border-box",
              margin: "auto",
              display: "block",
            }}
          >
            {renderGhe()}
          </div>
        </div>
        <div className=" col-span-4 space-y-5 table_info_datve">
          <div className="text-5xl text-center text-green-600  ">
            {totalGiaVe.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Cụm Rạp</h3>
            <h3 className="text-xl font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenCumRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Địa chỉ</h3>
            <h3 className="text-xl font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.diaChi}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Rạp</h3>
            <h3 className="text-xl font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Ngày giờ chiếu: </h3>
            <h3 className="text-xl font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.ngayChieu} ~{" "}
              <span className="text-red-500 font-medium">
                {thongTinDatVe.thongTinPhim?.gioChieu}
              </span>
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Tên phim: </h3>
            <h3 className="text-xl font-medium text-green-500">
              {thongTinDatVe.thongTinPhim?.tenPhim}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3 className="text-xl">Chọn: </h3>
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
          {/* <div>
            <i>Email : </i>
            {user.email}
          </div> */}
          {/* <div>
            <i>Phone : </i>
            {user.soDT}
          </div> */}
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
              className="bg-orange-500 hover:bg-green-600 text-white py-3 w-full rounded text-3xl"
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
