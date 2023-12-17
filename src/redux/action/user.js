import { message } from "antd";
import { https } from "../../service/config";
import { SET_INFO } from "../constant/user";
import { TURN_OFF, TURN_ON } from "../constant/spinner";

export let loginAction = (values, onNavigate) => {
  return (dispatch) => {
    dispatch({
      type: TURN_ON,
    });
    https
      .post(`/api/QuanLyNguoiDung/DangNhap`, values)
      .then((res) => {
        message.success("redux thunk thành công");

        // đẩy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFO", dataJson);
        dispatch({
          type: TURN_OFF,
        });
        //  đẩy thông tin user lên redux
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
        onNavigate("/");
      })
      .catch((err) => {
        dispatch({
          type: TURN_OFF,
        });
        message.error("redux thunk thất bại");
      });
  };
};
