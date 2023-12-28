import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { https } from "../../service/config";
import { Rate, Tabs } from "antd";
import moment from "moment";

export default function DetailPage() {
  const [detail, setdetail] = useState({});
  //  useParams lấy tham số trên url
  let { idPhim } = useParams();
  let navigate = useNavigate();

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

  const detailItems = detail.heThongRapChieu?.map((heThong, index) => {
    return {
      key: index,
      label: (
        <div>
          <img className="w-16" src={heThong.logo} alt="" />
        </div>
      ),

      children: (
        <div>
          {heThong.cumRapChieu?.map((cumRap, index) => {
            return (
              <div className="" key={index}>
                <div className="text-green-500 font-bold text-xl">
                  {cumRap.tenCumRap}
                </div>
                <div className="my-2">{cumRap.diaChi}</div>
                <div className="">
                  {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                    return (
                      <div key={index}>
                        <div className="my-2">{lichChieu.tenRap}</div>
                        <div className="my-2">
                          <NavLink
                            className="border border-gray-200 bg-gray-100 rounded p-1"
                            to={`/booking/${lichChieu.maLichChieu}`}
                          >
                            {moment(lichChieu.ngayChieuGioChieu).format(
                              "DD-MM-YYYY ~ HH:mm"
                            )}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ),
    };
  });

  return (
    <div className="container mb-10">
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
      <div className="mt-5">
        <Tabs
          className="border border-gray-300 py-3"
          tabPosition="left"
          defaultActiveKey="1"
          items={detailItems}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
