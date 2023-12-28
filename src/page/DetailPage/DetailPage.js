import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Rate, Tabs } from "antd";

export default function DetailPage() {
  const [detail, setdetail] = useState({});
  //  useParams lấy tham số trên url
  let { idPhim } = useParams();
  console.log("😃 - file: DetailPage.js:10 - DetailPage - idPhim:", idPhim);

  //  gọi api lấy chi tiết phim
  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idPhim}`)
      .then((res) => {
        console.log(res.data.content);
        setdetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChange = (key) => {
    console.log(key);
  };

  const detailItems = detail.heThongRapChieu?.map((rapChieu, index) => {
    return {
      key: index,
      label: <img className="w-16" src={rapChieu.logo} alt="" />,
      children: (
        <button className="border border-2 rounded p-2 m-3 text-green-500 font-bold bg-gray-100">
          {/* to={`/booking/${idPhim}`} 
          ko có dữ liệu từ sever nên bỏ link*/}
          <NavLink>{detail.ngayKhoiChieu}</NavLink>
        </button>
      ),
    };
  });

  return (
    <div className="container">
      <div className=" md:flex items-center">
        <img src={detail.hinhAnh} className="w-80 mb-5" alt="" />
        <div className="text-center  flex-grow ">
          <h2 className="md:text-5xl text-3xl text-blue-600 font-bold animate-pulse">
            {detail.tenPhim}
          </h2>

          <Rate
            className="space-y-5 text-base md:text-xl"
            style={{ fontSize: 40, color: "red" }}
            allowHalf
            count={5}
            value={detail.danhGia}
          />
          <br />

          <a
            className="text-2xl font-bold "
            target="_blank"
            href={detail.trailer}
          >
            Trailer
          </a>

          <p className="md:px-16 my-5" style={{ textAlign: "left" }}>
            {detail.moTa}
          </p>
        </div>
      </div>
      <div>
        <Tabs
          className="border border-gray-300"
          tabPosition="left"
          defaultActiveKey="1"
          items={detailItems}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
