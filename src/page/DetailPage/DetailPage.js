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
      <div> </div>
    </div>
  );
}
