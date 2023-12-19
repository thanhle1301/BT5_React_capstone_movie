import React, { useEffect } from "react";
import {
  form,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  Form,
  message,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { https } from "../../service/config";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import { SET_REGISTOR } from "../../redux/constant/user";
import { registorAction } from "../../redux/action/registor";

export default function FormRegister() {
  // quay về home
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // kiểm tra checkbox
  const validatePhone = (_, value) => {
    // Sử dụng regex để kiểm tra xem giá trị có phải là số hay không
    const isNumber = /^[0-9]+$/.test(value);
    if (!isNumber) {
      return Promise.reject("Vui lòng nhập số điện thoại hợp lệ");
    }

    return Promise.resolve();
  };

  const onFinish1 = (values) => {
    dispatch(registorAction(values, navigate));
  };
  const onFinishFailed1 = (errorReg) => {
    console.log("Failed:", errorReg);
  };
  return (
    // https://www.youtube.com/watch?v=ajp8hmAKEhM add form
    <div className="w-50 my-10">
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        autoComplete="off"
        onFinish={onFinish1}
        onFinishFailed={onFinishFailed1}
      >
        <Form.Item
          name="taiKhoan"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Tài khoản không được bỏ trống!",
            },

            {
              min: 5,
              message: "Tài khoản phải trên 4 ký tự!",
            },
            {
              whitespace: true,
              message: "Tài khoản không được có khoảng trắng!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Tên tài khoản" />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được bỏ trống!",
            },

            {
              min: 5,
              message: "Mật khẩu phải trên 4 ký tự!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="nhapLaiMatKhau"
          label="Nhập lại mật khẩu"
          dependencies={["matKhau"]} // 2 mk trùng nhau, nhưng xóa cái đầu sẽ lỗi
          rules={[
            {
              required: true, // không để trống
              message: "Vui lòng điền họ tên!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Mật khẩu không giống, vui lòng nhập lại!"
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Email không được bỏ trống!",
            },
            {
              whitespace: true,
              message: "Vui lòng không có khoảng trắng!",
            },

            {
              min: 5,
              message: "Email phải trên 4 ký tự!",
            },

            {
              type: "email",
              message: "Vui lòng nhập đúng thông tin!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Vui lòng điền họ tên!",
            },
            {
              whitespace: true,
              message: "Vui lòng không có khoảng trắng!",
            },

            {
              min: 5,
              required: true,
              message: "Vui lòng điền họ và tên!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="soDt"
          label="SDT"
          rules={[
            {
              min: 10,
              message: "SDT phải trên 9 ký tự!",
            },
            {
              whitespace: true,
              message: "SDT không được có khoảng trắng!",
            },
            { required: true, message: "SDT không được bỏ trống!" },
            { validator: validatePhone },
          ]}
          hasFeedback
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        {/* <Form.Item name="maNhom" label="Nhóm">
          <Select placeholder="Lựa chọn nhóm">
            <Select.Option value="GP01">Nhóm 1</Select.Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          name="agree"
          valuePropName="checked"
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject("Bạn chưa đồng ý!"),
            },
          ]}
        >
          <Checkbox>
            {" "}
            Bạn có đồng ý với các điều khoản{" "}
            <a className="text-blue-500" href="#">
              Thông tin bảo mật
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
        >
          <Button
            className="bg-green-600 w-50  hover:text-white hover:border-transparent font-bold"
            htmlType="submit"
          >
            Đăng ký
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="bg-red-600 w-50  hover:text-white hover:border-transparent font-bold"
            htmlType="submit"
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// record movie 5.1 1:09 phút
