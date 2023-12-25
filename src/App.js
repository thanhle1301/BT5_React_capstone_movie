import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import LoginPage from "./page/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import DetailPage from "./page/DetailPage/DetailPage";
import HomeLayout from "./layout/HomeLayout";
import Spinner from "./components/Spinner/Spinner";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import BookingTicket from "./page/BookingTicket/BookingTicket";
import BookedAccount from "./page/BookingTicket/BookedAccount/BookedAccount";
import Banner from "./components/Banner/Banner";
import BannerLayout from "./layout/BannerLayout";

function App() {
  return (
    <div className="">
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:idPhim" element={<DetailPage />} />
            <Route path="/booking/:maLichChieu" element={<BookingTicket />} />
            <Route path="/account" element={<BookedAccount />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
