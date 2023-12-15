import { message } from "antd";
import { https } from "../../service/config";
import { SET_INFO } from "../constant/user";

export let loginAction = (values, onNavigate) => {
  return (dispatch) => {
    https
      .post(`/api/QuanLyNguoiDung/DangNhap`, values)
      .then((res) => {
        console.log("😃 - file: user.js:10 - .then - res:", res);
        message.success("redux thunk thành công");

        // đẩy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFO", dataJson);
        //  đẩy thông tin user lên redux
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
        onNavigate("/");
      })
      .catch((err) => {
        message.error("redux thunk thất bại");
      });
  };
};
