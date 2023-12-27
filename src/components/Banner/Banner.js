import React, { useEffect, useState } from "react";
import { https } from "../../service/config";
import { Carousel } from "antd";

export default function Banner() {
  const [banner, setBanner] = useState([]);
  const contentStyle = {
    margin: 0,

    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayDanhSachBanner`)
      .then((res) => {
        setBanner(res.data.content);
      })
      .catch((err) => {
        console.log("😃 - file: Banner.js:10 - https.get - err:", err);
      });
  }, []);
  const onChange = (currentSlide) => {};

  const renderBanner = () => {
    return banner.map((item, index) => (
      <div key={index}>
        <h3 style={contentStyle}>
          <img className="w-full" src={item.hinhAnh} alt={item.hinhAnh} />
        </h3>
      </div>
    ));
  };
  return (
    <div className="container">
      <Carousel afterChange={onChange} autoplaySpeed={2000} autoplay="true">
        {renderBanner()}
      </Carousel>
    </div>
  );
}
