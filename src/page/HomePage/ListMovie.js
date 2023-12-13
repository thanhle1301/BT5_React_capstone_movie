import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { https } from "../../service/config";

export default function ListMovie() {
  //  React Hook để tạo một state trong một functional component
  const [movieArr, setmovieArr] = useState([]);
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
    https
      .get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`)
      .then((res) => {
        setmovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" container grid grid-cols-4 gap-5">
      {movieArr.map((item) => {
        return (
          //  lấy card có sẵn từ antd
          <Card
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
          </Card>
        );
      })}
    </div>
  );
}
