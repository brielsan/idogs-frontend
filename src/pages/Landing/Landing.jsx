import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Landing.module.css";

export default function Landing() {
  let navigate = useNavigate();

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.welcome}>
          <h1 className={s.title}>Welcome to iDogs 🐕</h1>
          <h2 className={s.title2}>Find all the information about your dogs</h2>
        </div>
        <div className={s.btn} onClick={() => navigate("/home")}>
          <div className={s.barrita}></div>
          <div className={s.textbtn}>Go to HomePage</div>
        </div>
      </div>
    </div>
  );
}
