import React, { useEffect, useState } from "react";
import { https, https2 } from "../../service/config";
import { useNavigate, useParams } from "react-router-dom";
import DoneBooking from "./DoneBooking";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { SET_BOOKING } from "../../redux/constant/user";

export default function BookingTicketAndDoneBooking() {
  let user = useSelector((state) => state.userReducer.user);

  let dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [thongTinDatVe, setThongTinDatVe] = useState({});
  const [gheDuocChon, setGheDuocChon] = useState([]);
  const [gheDaChon, setGheDaChon] = useState([]);

  const fetchAPI = () => {
    https
      .get(
        `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`
      )
      .then((res) => {
        setThongTinDatVe(res.data.content);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  // const handleSeatClick = (index) => {
  //   const updateGheNgoi = [...gheDuocChon];
  //   const indexGheNgoi = updateGheNgoi.indexOf(index);
  //   if (indexGheNgoi !== -1) {
  //     updateGheNgoi.splice(indexGheNgoi, 1);
  //   } else {
  //     updateGheNgoi.push(index);
  //   }
  //   setGheDuocChon(updateGheNgoi);
  // };
  const handleSeatClick = (index) => {
    // Kiểm tra xem ghế đã được chọn
    const selectedSeatIndex = gheDuocChon.indexOf(index);

    // Kiểm tra xem ghế đã được đặt
    const isSeatBooked = thongTinDatVe.danhSachGhe[index].daDat;

    // Nếu ghế đã được chọn hoặc đã được đặt, không làm gì cả
    if (selectedSeatIndex !== -1 || isSeatBooked) {
      return;
    }

    // Cập nhật danh sách ghế được chọn
    const updatedSelectedSeats = [...gheDuocChon, index];
    setGheDuocChon(updatedSelectedSeats);
  };

  const totalGiaVe = gheDuocChon.reduce(
    (sum, index) => sum + thongTinDatVe.danhSachGhe[index].giaVe,
    0
  );

  const handleClickBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const dataToServer = {
      maLichChieu: params.maLichChieu,
      taiKhoanNguoiDung: user?.taiKhoan,

      danhSachVe: gheDuocChon.map((index) => ({
        maGhe: thongTinDatVe.danhSachGhe[index].maGhe,
        tenGhe: thongTinDatVe.danhSachGhe[index].tenGhe,
        maRap: thongTinDatVe.thongTinPhim.tenCumRap,
        loaiGhe: thongTinDatVe.danhSachGhe[index].loaiGhe,
        stt: thongTinDatVe.danhSachGhe[index].stt,
        giaVe: thongTinDatVe.danhSachGhe[index].giaVe,
        daDat: false,
      })),
    };

    https2
      .post(`/api/QuanLyDatVe/DatVe`, dataToServer)
      .then((res) => {
        console.log("Đặt vé thành công", res);
        fetchAPI();

        let dataDatVe = {
          dataToServer: dataToServer,
        };
        let dataJson2 = JSON.stringify(dataDatVe);
        localStorage.setItem("USER_BOOK", dataJson2);

        dispatch({
          type: SET_BOOKING,
          payload: dataToServer,
        });

        Swal.fire({
          icon: "success",
          title: "Đặt vé thành công",
          showConfirmButton: true,
          confirmButtonText: "Đồng ý",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.reload();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex container">
      <div className="w-2/3 ">
        {thongTinDatVe.danhSachGhe?.map((dsGhe, index) => {
          const colorChair =
            dsGhe.loaiGhe === "Thuong" ? "rgba(128, 128, 128, 0.2)" : "orange";
          const isSelected = gheDuocChon.includes(index);
          const isBooked = dsGhe.daDat;
          const isSeatSelectedOrBooked = isSelected || isBooked;
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
                handleSeatClick(index);
              }}
            >
              {isSeatSelectedOrBooked ? "X" : dsGhe.tenGhe}
            </div>
          );
        })}
      </div>
      <div className="w-1/3">
        <div className="">
          <div className="table_info_datve">
            <div className="text-5xl text-center text-green-600 ">
              {totalGiaVe.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <hr className="hr_info" />

            <p>
              <span>Cụm Rạp: </span>
              <span>{thongTinDatVe.thongTinPhim?.tenCumRap}</span>
            </p>

            <p>
              <span>Cụm Rạp: </span>
              <span>{thongTinDatVe.thongTinPhim?.tenCumRap}</span>
            </p>
            <hr className="hr_info" />
            <p>
              <span>Địa chỉ: </span>

              <span>{thongTinDatVe.thongTinPhim?.diaChi}</span>
            </p>
            <hr className="hr_info" />
            <p>
              <span> Rạp: </span>
              <span>{thongTinDatVe.thongTinPhim?.tenRap}</span>
            </p>
            <hr className="hr_info" />
            <p>
              <span>Ngày giờ chiếu:</span>
              <span>
                {thongTinDatVe.thongTinPhim?.ngayChieu}
                {thongTinDatVe.thongTinPhim?.gioChieu}
              </span>
            </p>
            <hr className="hr_info" />
            <p>
              <span>Tên Phim:</span>
              <span>{thongTinDatVe.thongTinPhim?.tenPhim}</span>
            </p>
            <hr className="hr_info" />
            <p>
              <span>Chọn: </span>
              <span>
                {gheDuocChon.length > 0 &&
                  gheDuocChon
                    .map(
                      (index) =>
                        "Ghế " + thongTinDatVe.danhSachGhe[index].tenGhe
                    )
                    .join(", ")}
              </span>
            </p>
            <button
              onClick={handleClickBooking}
              className="bg-orange-600 rounded text-white text-3xl w-100 py-2"
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
