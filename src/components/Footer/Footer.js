import React from "react";

export default function Footer() {
  return (
    <div>
      <div>app</div>

      <div className="bg-slate-800 py-3 mb-10 text-center text-white hidden md:block">
        <div className="row container ">
          <div className="col-4">
            <h1>TIX</h1>
            <div className="row">
              <div className="col-6">
                <p className="text-sm text-gray-200">FAQ</p>
                <p className="text-sm text-gray-200">Brand Guidelines</p>
              </div>
              <div className="col-6">
                <p className="text-sm text-gray-200">Thỏa thuận sử dụng</p>
                <p className="text-sm text-gray-200">Chính sách bảo mật</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <h1>ĐỐI TÁC</h1>
            <div className="row">
              <div className="col-3">
                <img className=" hinh_anh_icon" src="./img/1.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/2.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/3.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/4.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/5.png" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/6.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/7.jpg" alt="#" />
                <img className="hinh_anh_icon" src="./img/8.png" alt="#" />

                <img className="hinh_anh_icon" src="./img/9.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/10.jpg" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/11.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/12.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/13.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/14.jpg" alt="#" />
                <img className="hinh_anh_icon" src="./img/15.png" alt="#" />
              </div>
              <div className="col-3">
                <img className="hinh_anh_icon" src="./img/16.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/17.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/18.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/19.png" alt="#" />
                <img className="hinh_anh_icon" src="./img/20.png" alt="#" />
              </div>
            </div>
          </div>
          <div className="col-4 row">
            <div className="col-6">
              <h1>MOBILE APP</h1>
              <div className="flex justify-evenly items-center">
                <img
                  className="sm:w-5 w-10 py-3"
                  src="./img/apple.png"
                  alt=""
                />

                <img
                  className="sm:w-5 w-10 py-3"
                  src="./img/android.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-6">
              <h1>SOCIAL</h1>
              <div className="flex justify-evenly items-center">
                <img
                  className="sm:w-5 w-10  py-3"
                  src="./img/facebook.png"
                  alt=""
                />

                <img
                  className="sm:w-5 w-10  py-3"
                  src="./img/zalo.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
