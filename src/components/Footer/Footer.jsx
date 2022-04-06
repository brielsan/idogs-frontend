import React from "react";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={s.root}>
      <div className={s.copyright}>
        &copy; Copyright 2022 Gabriel Sanchez || Henry Labs
      </div>
    </div>
  );
}
