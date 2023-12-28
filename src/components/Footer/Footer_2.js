import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";

export default function Footer() {
  const backgroundImageUrl =
    "https://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg"; // Thay đổi đường dẫn đến hình ảnh bạn muốn sử dụng

  const appImageUrl =
    "https://demo1.cybersoft.edu.vn/static/media/banner-slider-3.33a486d1.jpg"; // Thay đổi đường dẫn đến hình ảnh bạn muốn sử dụng

  const overlayImageUrl =
    "data:image/png;base64,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"; // Đường dẫn đến hình ảnh muốn đè lên nền

  const bgImgStyle = {
    backgroundImage: url(${backgroundImageUrl}), // Đặt hình ảnh làm nền
    backgroundRepeat: "repeat", // Thiết lập hình nền để lặp lại
    top: 0, // Đặt vị trí top là 0
    left: 0, // Đặt vị trí left là 0
    width: "100%", // Đặt chiều rộng là 100%
    height: "80%", // Chiều cao sẽ chiếm toàn bộ trừ đi chiều cao của footer (ở đây giả sử là 50px)
    padding: "120px 0px 80px",
    zIndex: -1, // Đặt sự ưu tiên hiển thị thấp hơn so với các phần tử khác
    position: "relative", // Thêm thuộc tính position: relative để có thể đặt vị trí cho phần tử con
    border: "1px solid",
  };

  const textStyle = {
    position: "absolute", // Đặt vị trí tuyệt đối để có thể điều chỉnh vị trí của văn bản trên hình ảnh
    top: "45%", // Đặt vị trí top ở giữa phần trên của hình ảnh
    left: "35%", // Đặt vị trí left ở giữa phần trái của hình ảnh
    transform: "translate(-50%, -50%)", // Dịch chuyển văn bản điều chỉnh vị trí chính xác đến giữa hình ảnh
    color: "white", // Màu văn bản trắng để tương phản với hình nền
    fontSize: "1em", // Cỡ chữ
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Đổ bóng cho văn bản
  };

  const titleStyle = {
    position: "absolute", // Đặt vị trí tuyệt đối để có thể điều chỉnh vị trí của văn bản trên hình ảnh
    top: "35%", // Đặt vị trí top ở giữa phần trên của hình ảnh
    left: "35%", // Đặt vị trí left ở giữa phần trái của hình ảnh
    transform: "translate(-50%, -50%)", // Dịch chuyển văn bản điều chỉnh vị trí chính xác đến giữa hình ảnh
    color: "white", // Màu văn bản trắng để tương phản với hình nền
    fontWeight: "bold",
    fontSize: "2em", // Cỡ chữ
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Đổ bóng cho văn bản
  };

  const overlayImgStyle = {
    position: "absolute",
    top: "20%",
    left: "65%",
    bottom: "20%",
    width: "196px",
    height: "425px",
    zIndex: 1, // Đặt sự ưu tiên hiển thị cao hơn so với hình nền
  };
  const appImgStyle = {
    position: "absolute",
    marginTop: "1%",
    left: "65.3%",
    width: "185px",
    height: "405px",
    zIndex: 1, // Đặt sự ưu tiên hiển thị cao hơn so với hình nền
    position: "relative",
  };

  const [size, setSize] = useState("large");

  const buttonStyle = {
    position: "absolute",
    backgroundColor: "#fb4226",
    fontWeight: "bold",
    top: "55%",
    left: "23%",
    width: "293px",
    height: "58px",
  };

  return (
    <div>
      <div className="bgimg" style={bgImgStyle}>
        <div style={titleStyle}>
          Ứng dụng tiện lợi dành cho người yêu điện ảnh
        </div>
        <div style={textStyle}>
          Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi
          quà hấp dẫn.
        </div>
        <div style={overlayImgStyle}>
          <img
            src={overlayImageUrl}
            alt="Overlay"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div style={appImgStyle}>
          <img
            src={appImageUrl}
            alt="Overlay"
            style={{
              borderRadius: "25px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div>
          <Button
            style={buttonStyle}
            type="primary"
            icon={<DownloadOutlined />}
            size={size}
          >
            APP MIỄN PHÍ - TẢI VỀ NGAY!
          </Button>
        </div>
      </div>

      <div className="bg-slate-800 py-3 text-center text-white hidden xl:block">
        <div className="row container ">
          <div className="col-4">
            <h1>TIX</h1>
            <div className="row">
              <div className="col-6">
                <p className="text-sm text-gray-200">FAQ</p>
                <p className="text-sm text-gray-200">Brand Guidelines</p>
              </div>
              <div className="col-6">
                <p className="text-sm text-gray-200">Thỏa thuận sử dụng</p>
                <p className="text-sm text-gray-200">Chính sách bảo mật</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <h1>ĐỐI TÁC</h1>
            <div className="row">
              <div className="col-3">
                <img className=" hinh_anh_icon" src="./img/1.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/2.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/3.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/4.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/5.png" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/6.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/7.jpg" alt="#" />
                <img className="hinh_anh_icon" src="./img/8.png" alt="#" />

                <img className="hinh_anh_icon" src="./img/9.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/10.jpg" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/11.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/12.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/13.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/14.jpg" alt="#" />
                <img className="hinh_anh_icon" src="./img/15.png" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/16.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/17.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/18.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/19.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/20.png" alt="#" />
              </div>
            </div>
          </div>
          <div className="col-4 row">
            <div className="col-6">
              <h1>MOBILE APP</h1>
              <div className="flex justify-evenly items-center">
                <img className="w-10 py-3" src="./img/apple.png" alt="" />

                <img className="w-10 py-3" src="./img/android.png" alt="" />
              </div>
            </div>
            <div className="col-6">
              <h1>SOCIAL</h1>
              <div className="flex justify-evenly items-center">
                <img className="w-10 py-3" src="./img/facebook.png" alt="" />

                <img className="w-10 py-3" src="./img/zalo.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}