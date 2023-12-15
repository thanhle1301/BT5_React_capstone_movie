import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../service/config";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/action/user";

const FormLogin = () => {
  let dispatch = useDispatch();
  let navigative = useNavigate();

  // cách 1: gọi api từng component
  // const onFinishV2 = (values) => {
  //   https
  //     .post(`/api/QuanLyNguoiDung/DangNhap`, values)
  //     .then((res) => {
  //       // đẩy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
  //       let dataJson = JSON.stringify(res.data.content);
  //       localStorage.setItem("USER_INFO", dataJson);

  //       // console.log("đăng nhập thành công", res.data.content);
  //       message.success("Đăng nhập thành công");
  //       navigative("/");
  //       //  đẩy thông tin user lên redux
  //       dispatch({
  //         type: SET_INFO,
  //         payload: res.data.content,
  //       });
  //     })
  //     .catch((err) => {
  //       // console.log("đăng nhập thất bại", err);
  //       message.error("Đăng nhập thất bại");
  //     });
  // };

  //  cách 2: gọi api trên redux - sau chỉ cần dispatch funtion (gọn hơn)
  const onFinish = (values) => {
    dispatch(loginAction(values, navigative));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tài khoản"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Tài khoản không được bỏ trống!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Mậu khẩu không được bỏ trống!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Nhớ đăng nhập</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="bg-blue-600  hover:text-white hover:border-transparent font-bold"
          htmlType="submit"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
