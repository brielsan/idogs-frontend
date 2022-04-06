import React, { useEffect, useState } from "react";
import s from "./TemperamentWindow.module.css";
import close from "../../../ico/close.png";
import maximize from "../../../ico/maximize.png";
import addico from "../../../ico/check.png";
import { useDispatch, useSelector } from "react-redux";
import {
  filterApiDB,
  filterTemperament,
  filterTemperamentDelete,
  order,
  requestTemperaments,
} from "../../../redux/dogs.actions.js";

export default function TemperamentWindow({ window, setWindow, setPagina }) {
  const dispatch = useDispatch();

  let temperaments = useSelector((state) => state.temperaments);

  let tempDogsFilter = useSelector((state) => state.tempDogsFilter);

  const [listTemperaments, setlistTemperaments] = useState(temperaments); //left temperaments

  const [userTemperaments, setuserTemperaments] = useState([]); //right temperaments

  const [fullScreen, setfullScreen] = useState(false);

  let actualorderFilter = useSelector((state) => state.orderFilter);

  let actualTemperaments = JSON.parse(localStorage.getItem("userTemperaments"));

  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(requestTemperaments());
    }
  }, [dispatch, temperaments]);

  useEffect(() => {
    if (tempDogsFilter.length == 0) {
      setuserTemperaments([]);
    }
  }, [tempDogsFilter]);
  
  useEffect(() => {
    actualTemperaments && setuserTemperaments(actualTemperaments);
    actualTemperaments &&
      setlistTemperaments(
        temperaments.filter((el) => {
          if (actualTemperaments.find((el2) => el2.name == el.name)) {
            return false;
          } else {
            return true;
          }
        })
      );
  }, []);

  ///-------------MOVE TEMPERAMENT------------------///

  const moveToUser = (el) => {
    localStorage.setItem(
      "userTemperaments",
      JSON.stringify([...userTemperaments, el])
    );
    setuserTemperaments([...userTemperaments, el]);
    setlistTemperaments([...listTemperaments.filter((b) => b !== el)]);
    dispatch(filterTemperament(el.name));
    dispatch(order(actualorderFilter.order));
    dispatch(filterApiDB(actualorderFilter.filter, false));
    setPagina(1);
  };

  const moveToList = async (el) => {
    localStorage.setItem(
      "userTemperaments",
      JSON.stringify([...userTemperaments.filter((b) => b !== el)])
    );
    setuserTemperaments([...userTemperaments.filter((b) => b !== el)]);
    let list = [...listTemperaments, el].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    setlistTemperaments(list);
    dispatch(filterTemperamentDelete(el.name));
    dispatch(order(actualorderFilter.order));
    dispatch(filterApiDB(actualorderFilter.filter, false));
    setPagina(1);
  };

  ///-----------------------------------------------------------///

  return (
    <div
      className={
        window == false
          ? s.off
          : fullScreen == false
          ? s.root
          : s.rootfullscreen
      }
    >
      <div className={s.window}>
        <h1 className={s.title}>Filter by temperament</h1>
        <div className={s.btns}>
          <img
            className={s.btnfs}
            onClick={() =>
              fullScreen == false ? setfullScreen(true) : setfullScreen(false)
            }
            src={maximize}
            alt=""
          />
          <img
            className={s.btn}
            src={close}
            alt=""
            onClick={() => setWindow(false)}
          />
        </div>
      </div>
      <div className={s.container}>
        <div className={s.temperamentUser}>
          <div className={s.temperamentlistcontainer}>
            <div className={s.listTemperament}>
              {listTemperaments?.map((el) => (
                <div className={s.temperamentcontainer}>
                  <div className={s.temperament}>{el.name}</div>
                  <img
                    src={addico}
                    alt=""
                    className={s.btntemperament}
                    onClick={() => moveToUser(el)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.separate}></div>
        <div className={s.temperamentList}>
          <div className={s.temperamentlistcontainer}>
            <div className={s.listTemperament}>
              {userTemperaments?.map((el) => (
                <div className={s.temperamentcontainer}>
                  <div className={s.temperament}>{el.name}</div>
                  <img
                    src={close}
                    alt=""
                    className={
                      userTemperaments[userTemperaments?.length - 1] == el
                        ? s.btntemperament
                        : s.off
                    }
                    onClick={() => moveToList(el)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
