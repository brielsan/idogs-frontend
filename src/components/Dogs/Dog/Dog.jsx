import React from "react";
import { Link } from "react-router-dom";
import s from "./Dog.module.css";

export default function Dog({ name, img, temperament, createdByDB, weight }) {
  let temperamentos = [...temperament];

  temperamentos.length = 3;

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={s.text}>{name ? name : "unknown"}</div>
        <Link to={`/dog/${name}`}>
          <img
            className={s.img}
            src={img}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://i.insider.com/5ef54cb61918242cfb4ec653?width=700";
            }}
            alt=""
          />
        </Link>
      </div>
      <div className={s.temperament}>
        {temperamentos.map((el, index) =>
          index !== 2 ? <p>{el.name}, &nbsp;</p> : <p>{el.name}</p>
        )}
      </div>
      <div className={s.weight}>Weight: {weight} KG</div>
    </div>
  );
}
