import atras from "../../ico/atras.png";
import next from "../../ico/siguiente.png";
import s from "./Pages.module.css";

import React from "react";

export default function Pages({
  pagina,
  maximo,
  setPagina,
  onSearch,
  actualDogs,
}) {
  const firstPage = () => {
    localStorage.setItem("page", 1);
    setPagina(1);
  };

  const prevPage = () => {
    if (pagina !== 1) {
      localStorage.setItem("page", pagina - 1);
      setPagina(pagina - 1);
    }
  };

  const nextPage = () => {
    if (pagina !== maximo) {
      localStorage.setItem("page", pagina + 1);
      setPagina(pagina + 1);
    }
  };

  const lastPage = () => {
    localStorage.setItem("page", maximo);
    setPagina(maximo);
  };

  return (
    <div
      className={
        onSearch === false && actualDogs >= 1 ? s.paginationinputs : s.off
      }
    >
      <div className={s.btn}>
        <img src={atras} onClick={prevPage} alt="" />
      </div>
      <p
        value={1}
        onClick={firstPage}
        className={
          pagina === maximo && pagina !== 1 && pagina !== 2 ? s.pages : s.off
        }
      >
        1
      </p>
      <p
        className={
          pagina === maximo && pagina !== 1 && pagina !== 2 ? s.puntos : s.off
        }
      >
        ...
      </p>
      <p
        value={pagina - 1}
        onClick={prevPage}
        className={pagina === 1 || pagina - 1 < 0 ? s.off : s.pages}
      >
        {pagina - 1}
      </p>
      <p className={s.actualPage}>{pagina}</p>
      <p
        value={pagina + 1}
        onClick={nextPage}
        className={pagina === maximo || pagina === maximo - 1 ? s.off : s.pages}
      >
        {pagina + 1}
      </p>
      <p className={pagina === maximo || maximo === 2 ? s.off : s.puntos}>
        ...
      </p>
      <p
        value={maximo}
        onClick={lastPage}
        className={pagina === maximo ? s.off : s.pages}
      >
        {maximo}
      </p>
      <div className={s.btn}>
        <img src={next} onClick={nextPage} alt="" />
      </div>
    </div>
  );
}
