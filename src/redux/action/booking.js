// import { https2 } from "../../service/config";
// import Swal from "sweetalert2";
// import { SET_BOOKING } from "../constant/user";

// export let bookingAction = (dataToServer, navigate, thongTinDatVe) => {
//   return (dispatch) => {
//     // Gửi yêu cầu đặt vé lên server ở đây
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
//   };
// };
