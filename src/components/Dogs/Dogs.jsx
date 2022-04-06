import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dog from "./Dog/Dog.jsx";
import Pages from "../Pagination/Pages.jsx";
import TemperamentWindow from "../SearchBar/TemperamentWindow/TemperamentWindow.jsx";
import s from "./Dogs.module.css";

export default function Dogs({
  onSearch,
  resetPage,
  setresetPage,
  window,
  setWindow,
}) {
  let dogs = useSelector((state) => state.dogs);

  let dogsbuscados = useSelector((state) => state.searchdogs);

  ///--------------------PAGINATION-------------------------------///

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);

  let actualPage =
    localStorage.getItem("page") == null ? 1 : localStorage.getItem("page");

  useEffect(() => {
    setPagina(Number(actualPage));
  }, []);

  const maximo = Math.ceil(dogs.length / porPagina);

  let actualDogs = dogs.slice(
    (pagina - 1) * porPagina,
    (pagina - 1) * porPagina + porPagina
  ).length;

  ///-----------------------------------------------------------///

  useEffect(() => {
    if (resetPage == "order" || resetPage == "filter") {
      setresetPage("initial");
      setPagina(1);
    }
  });

  return (
    <div className={s.root}>
      <div className={s.pagination}>
        <TemperamentWindow
          window={window}
          setWindow={setWindow}
          setPagina={setPagina}
        />
        <div className={s.dogs}>
          {onSearch == true && dogsbuscados.length > 0 ? (
            dogsbuscados.map((el) => {
              return (
                <Dog
                  name={el.name}
                  img={el.image.url}
                  temperament={el.temperament}
                  weight={el.weight.metric}
                  createdByDB={
                    el.hasOwnProperty("createdByDB") ? el.createdByDB : false
                  }
                />
              );
            })
          ) : dogs.length > 0 ? (
            dogs
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((el) => {
                return (
                  <Dog
                    name={el.name}
                    img={el.image.url}
                    temperament={el.temperament}
                    weight={el.weight.metric}
                    createdByDB={
                      el.hasOwnProperty("createdByDB") ? el.createdByDB : false
                    }
                  />
                );
              })
          ) : (
            <div className={s.notfound}>
              <img
                alt=""
                src="https://c.tenor.com/LAoDzgsmlz8AAAAC/compilation-dogs.gif"
              />
              <span className={s.notfoundtext}>
                No dogs were found that match the selected filters.
              </span>
            </div>
          )}
        </div>
      </div>
      <Pages
        actualDogs={actualDogs}
        onSearch={onSearch}
        pagina={pagina}
        maximo={maximo}
        setPagina={setPagina}
      />
    </div>
  );
}
