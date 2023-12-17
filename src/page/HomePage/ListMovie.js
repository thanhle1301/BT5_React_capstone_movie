import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { https } from "../../service/config";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import { TURN_OFF, TURN_ON } from "../../redux/constant/spinner";

export default function ListMovie() {
  //  React Hook để tạo một state trong một functional component
  const [movieArr, setmovieArr] = useState([]);

  //  useDispatch ~ mapDispatchToProps ~ đẩy data lên redux
  let dispatch = useDispatch();

  // gọi API khi user load trang
  useEffect(() => {
    // thay thế axios => bằng https từ axios instance
    // axios({
    //   url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
    //   method: "GET",
    //   headers: {
    //     TokenCybersoft:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjMzNjAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE2NDgzNjAwfQ.argi0m1LRAePDxZ6Nb4AX25fZ9gclDCUAA5oW84-TsQ",
    //   },
    // })

    // bật loading
    dispatch({
      type: TURN_ON,
    });
    https
      .get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`)
      .then((res) => {
        dispatch({
          type: TURN_OFF,
        });
        setmovieArr(res.data.content);
      })
      .catch((err) => {
        dispatch({
          type: TURN_ON,
        });
        console.log(err);
      });
  }, []);
  return (
    <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {movieArr.map((item, index) => {
        return (
          //  lấy card có sẵn từ antd
          <Card
            key={index}
            hoverable
            style={{
              width: "100%",
            }}
            cover={<img alt="example" src={item.hinhAnh} />}
          >
            <h2 className="truncate pb-3  font-medium text-base px-0">
              {item.tenPhim}
            </h2>
            <p className="truncate text-sm">{item.moTa}</p>
            <NavLink
              to={`/detail/${item.maPhim}`}
              className="px-5 py-2 mt-2 rounded border-2 border-red-500 block text-center"
            >
              Xem chi tiết
            </NavLink>
          </Card>
        );
      })}
    </div>
  );
}
