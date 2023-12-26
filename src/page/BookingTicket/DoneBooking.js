// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { bookingAction } from "../../redux/action/booking";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { https2 } from "../../service/config";
// import { SET_BOOKING } from "../../redux/constant/user";

// export default function DoneBooking({ thongTinDatVe, gheDuocChon }) {
//   let user = useSelector((state) => state.userReducer.user);

//   let navigate = useNavigate();
//   let params = useParams();
//   let dispatch = useDispatch();

//   const totalGiaVe = gheDuocChon.reduce(
//     (sum, index) => sum + thongTinDatVe.danhSachGhe[index].giaVe,
//     0
//   );

//   // đặt vé
//   const handleClickBooking = () => {
//     const dataToServer = {
//       maLichChieu: params.maLichChieu,
//       taiKhoanNguoiDung: user?.taiKhoan,

//       danhSachVe: gheDuocChon.map((index) => ({
//         maGhe: thongTinDatVe.danhSachGhe[index].maGhe,
//         tenGhe: thongTinDatVe.danhSachGhe[index].tenGhe,
//         maRap: thongTinDatVe.thongTinPhim.tenCumRap,
//         loaiGhe: thongTinDatVe.danhSachGhe[index].loaiGhe,
//         stt: thongTinDatVe.danhSachGhe[index].stt,
//         giaVe: thongTinDatVe.danhSachGhe[index].giaVe,
//         daDat: false,
//       })),
//     };
//     https2
//       .post(`/api/QuanLyDatVe/DatVe`, dataToServer)
//       .then((res) => {
//         console.log("Đặt vé thành công", res);
//         let dataDatVe = {
//           dataToServer: dataToServer,
//         };
//         let dataJson2 = JSON.stringify(dataDatVe);
//         localStorage.setItem("USER_BOOK", dataJson2);

//         dispatch({
//           type: SET_BOOKING,
//           payload: dataToServer,
//         });

//         Swal.fire({
//           icon: "success",
//           title: "Đặt vé thành công",
//           showConfirmButton: true,
//           confirmButtonText: "Đồng ý",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             // window.location.reload();
//           }
//         });
//         // Xử lý sau khi đặt vé thành công, có thể chuyển hướng trang hoặc hiển thị thông báo
//       })
//       .catch((err) => {
//         console.log("Lỗi đặt vé", err);
//       });
//     ////
//   };

//   return (
//     <div className="">
//       <div className="table_info_datve">
//         <div className="text-5xl text-center text-green-600 ">
//           {/* <span >Giá vé: </span> */}
//           {/* <span> */}
//           {totalGiaVe.toLocaleString("vi-VN", {
//             style: "currency",
//             currency: "VND",
//           })}
//           {/* </span> */}
//         </div>
//         <hr className="hr_info" />

//         <p>
//           <span>Cụm Rạp: </span>
//           <span>{thongTinDatVe.thongTinPhim?.tenCumRap}</span>
//         </p>
//         <hr className="hr_info" />
//         <p>
//           <span>Địa chỉ: </span>

//           <span>{thongTinDatVe.thongTinPhim?.diaChi}</span>
//         </p>
//         <hr className="hr_info" />
//         <p>
//           <span> Rạp: </span>
//           <span>{thongTinDatVe.thongTinPhim?.tenRap}</span>
//         </p>
//         <hr className="hr_info" />
//         <p>
//           <span>Ngày giờ chiếu:</span>
//           <span>
//             {thongTinDatVe.thongTinPhim?.ngayChieu}
//             {thongTinDatVe.thongTinPhim?.gioChieu}
//           </span>
//         </p>
//         <hr className="hr_info" />
//         <p>
//           <span>Tên Phim:</span>
//           <span>{thongTinDatVe.thongTinPhim?.tenPhim}</span>
//         </p>
//         <hr className="hr_info" />
//         <p>
//           <span>Chọn: </span>
//           <span>
//             {gheDuocChon.length > 0 &&
//               gheDuocChon
//                 .map(
//                   (index) => "Ghế " + thongTinDatVe.danhSachGhe[index].tenGhe
//                 )
//                 .join(", ")}
//           </span>
//         </p>
//       </div>

//       <div>
//         <button
//           onClick={handleClickBooking}
//           className="bg-orange-600 rounded text-white text-3xl w-100 py-2"
//         >
//           ĐẶT VÉ
//         </button>
//       </div>
//     </div>
//   );
// }
