import React, { useEffect, useState } from "react";
import { https } from "../../../service/config";
import { Tabs, Tooltip } from "antd";
import ItemMovie from "./ItemMovie";

export default function TabMovie() {
  const [heThongRap, setheThongRap] = useState([]);
  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`)
      .then((res) => {
        console.log("😃 123:", res.data.content);
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
                <div className="text-left w-60 ">
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
    <div className="container pb-96 ">
      <h2 className="my-5 font-bold text-4xl text-center">
        Cụm rạp và suất chiếu phim
      </h2>
      <Tabs
        className="border border-gray-300"
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

// {
//   key: "1",
//   label: "Tab 1",
//   children: "Content of Tab Pane 1",
// },
