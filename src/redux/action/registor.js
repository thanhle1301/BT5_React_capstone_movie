import { message } from "antd";
import { https } from "../../service/config";
import { SET_REGISTOR } from "../constant/user";

export let registorAction = (values, navigate) => {
  return (dispatch) => {
    https
      .post(`/api/QuanLyNguoiDung/DangKy`, values)
      .then((res) => {
        console.log("😃 - file: registor.js:7 - https.post - res:", res);
        message.success("Chúc mừng bạn đã đăng ký thành công!");
        let dataJson1 = JSON.stringify(values);
        localStorage.setItem("USER_REG", dataJson1);
        dispatch({
          type: SET_REGISTOR,
          payload: values,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log("😃 - file: registor.js:9 - https.post - err:", err);
        message.error("Đăng ký thất bại!");
      });
  };
};
