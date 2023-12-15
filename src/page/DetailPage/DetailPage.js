import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Rate } from "antd";

export default function DetailPage() {
  const [detail, setdetail] = useState({});
  //  useParams lấy tham số trên url
  let { idPhim } = useParams();

  //  gọi api lấy chi tiết phim
  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idPhim}`)
      .then((res) => {
        console.log(res.data.content);
        setdetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className=" flex items-center">
        <img src={detail.hinhAnh} className="w-80" alt="" />
        <div className="text-center  flex-grow ">
          <h2 className="text-5xl text-blue-600 font-bold animate-pulse">
            {detail.tenPhim}
          </h2>

          <Rate
            className="space-y-5"
            style={{ fontSize: 40, color: "red" }}
            allowHalf
            count={10}
            value={detail.danhGia}
          />
          <br />

          <a
            className="text-2xl font-bold"
            target="_blank"
            href={detail.trailer}
          >
            Trailer
          </a>

          <p className="px-16 my-5" style={{ textAlign: "left" }}>
            {detail.moTa}
          </p>
        </div>
      </div>
      <div> phần dưới detail</div>
    </div>
  );
}
