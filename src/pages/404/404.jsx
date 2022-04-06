import React from "react";
import s from "./notfound.module.css";
import notfound from "../../img/what-loading.gif";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={s.root}>
      <div className={s.container}>
        <img className={s.img} src={notfound} alt="" />
        <div className={s.text}>404 Route not found</div>
        <button className={s.btn} onClick={() => navigate("/home")}>
          Return to main page
        </button>
      </div>
    </div>
  );
}
