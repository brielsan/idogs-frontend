import React from "react";
import s from "./Temperaments.module.css";
import onclose from "../../../ico/close.png";

export default function Temperaments({ temperaments, onClose }) {
  return (
    <div className={temperaments.length > 0 ? s.root : s.off}>
      <div className={s.title}>Temperaments</div>
      <div className={s.container}>
        {temperaments.map((el) => (
          <div className={s.temperamentcontainer}>
            <div className={s.temperament}>{el}</div>
            <img
              src={onclose}
              alt=""
              className={s.btn}
              onClick={() => onClose(el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
