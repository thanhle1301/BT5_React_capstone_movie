import React, { useEffect, useState } from "react";
import { https2 } from "../../../service/config";

export default function BookedAccount() {
  const [user, setUser] = useState({});
  useEffect(() => {
    https2
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        console.log("😃 - file: BookedAccount.js:80 - .then - res:", res);
        setUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg_movie">
      <div className="bg_movie_2">
        <div className="p-10"></div>
        <div className="table_history"> 121weeeeeeeeeeeeeeeeeeee3</div>
      </div>
    </div>
  );
}
