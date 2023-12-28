import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie";

export default function TabMovie() {
  const [heThongRap, setheThongRap] = useState([]);
  const [tabPosition, setTabPosition] = useState("left");
  useEffect(() => {
    const handleResize = () => {
      // Thay 767 bằng giá trị md tương ứng của bạn
      setTabPosition(window.innerWidth >= 768 ? "left" : "top");
    };
    handleResize();
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`)
      .then((res) => {
        setheThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = heThongRap.map((heThong, index) => {
    return {
      key: index,
      label: <img className="w-16" src={heThong.logo} alt="" />,
      children: (
        <Tabs
          style={{
            height: 600,
          }}
          tabPosition="left"
          items={heThong.lstCumRap.map((cumRap) => {
            return {
              key: cumRap.diaChi,
              label: (
                <div className="text-left  w-60 ">
                  <Tooltip title={cumRap.diaChi}>
                    <p className="text-green-500 text-base font-bold">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="truncate">{cumRap.diaChi}</p>
                  </Tooltip>
                </div>
              ),

              children: (
                <div
                  style={{
                    height: 600,
                  }}
                  className="space-y-5 overflow-scroll"
                >
                  {cumRap.danhSachPhim.map((phim) => {
                    return (
                      <div>
                        <ItemMovie data={phim} key={phim.maPhim} />;
                      </div>
                    );
                  })}
                </div>
              ),
            };
          })}
        />
      ),
    };
  });

  return (
    <div
      className="container pb-96 
    
    "
    >
      {/* hidden md:block */}
      <h2 className="my-5 font-bold text-4xl text-center">
        Cụm rạp và suất chiếu phim
      </h2>
      <Tabs
        className="border border-gray-300"
        tabPosition={tabPosition}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
