import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_DOGS } from "../../redux/dogs.type";
import { order, filterApiDB } from "../../redux/dogs.actions.js";
import s from "./SearchBar.module.css";
import search from "../../ico/search.png";

export default function SearchBar({ setOnSearch, setresetPage, setWindow }) {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  ///--------------------SEARCH BAR FUNCTION--------------------///

  const searchDogs = (input) => {
    if (input.trim().length === 0) {
      setOnSearch(false);
      window.alert("Please enter a breed name");
      setInput("");
    } else {
      if (input.trim().length >= 3) {
        fetch(`https://idogsback.herokuapp.com/dogs?name=${input.trim()}`)
          .then((response) => response.json())
          .then((data) => {
            if (data[0]?.name) {
              setOnSearch(true);
              setInput(input.trim())
              return dispatch({ type: SEARCH_DOGS, payload: data });
            } else {
              window.alert(
                "No breed with that name found, but you can create it :)"
              );
              setOnSearch(false);
            }
          });
      } else {
        window.alert("Please enter a breed name");
        setOnSearch(false);
      }
    }
  };

  ///-----------------------------------------------------------///

  let actualorderFilter = useSelector((state) => state.orderFilter);

  ///----------------CHANGE ORDER AND FILTER FUNCTION----------------///

  const onChangeOrder = (e) => {
    dispatch(order(e.target.value));
    setresetPage("order"); /// states that the page should be reseted
  };

  const onChangeFilter = (e) => {
    dispatch(filterApiDB(e.target.value, true)); /// filter and delete temperaments on temperamentwindow
    dispatch(filterApiDB(e.target.value, false)); /// reloading dogs
    setresetPage("filter");
    dispatch(order(actualorderFilter.order));
  };

  ///-----------------------------------------------------------///

  ///----------GET LENGTH OF ACTUAL TEMPERAMENT FILTER--------------///

  const [actualTemperaments, setactualTemperaments] = useState(
    JSON.parse(localStorage.getItem("userTemperaments"))?.length
  );

  /// set num
  useEffect(() => {
    setactualTemperaments(
      JSON.parse(localStorage.getItem("userTemperaments"))?.length
    );
  });

  ///-----------------------------------------------------------///

  return (
    <div className={s.root}>
      <div className={s.order_filter}>
        <div className={s.order}>
          <p className={s.ordertext}>Order by:</p>
          <select
            className={s.list}
            onChange={(e) => onChangeOrder(e)}
            defaultValue={actualorderFilter.order}
          >
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
            <option value="ascweight">Weight Ascendent</option>
            <option value="descweight">Weight Descendent</option>
          </select>
        </div>
        <div className={s.columnMobile}>
          <div className={s.filter}>
            <p className={s.ordertext}>Filter by:</p>
            <select
              className={s.list}
              defaultValue={actualorderFilter.filter}
              onChange={(e) => {
                onChangeFilter(e);
                localStorage.removeItem("userTemperaments");
              }}
            >
              <option value="all">API & Database</option>
              <option value="api">API</option>
              <option value="db">Database</option>
            </select>
            <button className={s.list} onClick={() => setWindow(true)}>
              Temperament
            </button>
          </div>
          <div>
            <p className={actualTemperaments ? s.temperamentselected : s.off}>
              {actualTemperaments} Temperament selected.
            </p>
          </div>
        </div>
      </div>
      <div className={s.searchBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search a dog"
          onKeyDown={(e) => e.key === "Enter" && searchDogs(input)}
        ></input>
        <img
          src={search}
          alt=""
          onClick={() => searchDogs(input)}
          className={s.search}
        />
      </div>
    </div>
  );
}
