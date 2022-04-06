import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestDogs, requestTemperaments } from "../../redux/dogs.actions.js";
import Nav from "../../components/Nav/Nav.jsx";
import s from "./Home.module.css";
import Dogs from "../../components/Dogs/Dogs.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../img/loading.gif";

export default function Home() {
  const dispatch = useDispatch();

  let alldogs = useSelector((state) => state.alldogs);

  let temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    if (alldogs.length === 0) {
      dispatch(requestDogs());
    }
    if (temperaments.length === 0) {
      dispatch(requestTemperaments());
    }
  }, [dispatch]);
  
  // useEffect(() => {
  //   localStorage.removeItem("page");
  //   localStorage.removeItem("userTemperaments");
  // }, []);

  const [onSearch, setOnSearch] = useState(false);

  const [resetPage, setresetPage] = useState("initial");

  const [window, setWindow] = useState(false);

  return (
    <div className={s.father}>
      {alldogs.length > 0 ? (
        <div className={s.root}>
          <Nav />
          <SearchBar
            setWindow={setWindow}
            setOnSearch={setOnSearch}
            setresetPage={setresetPage}
          />
          <Dogs
            setWindow={setWindow}
            onSearch={onSearch}
            resetPage={resetPage}
            setresetPage={setresetPage}
            window={window}
          />
          <Footer />
        </div>
      ) : (
        <div className={s.loading}>
          <img className={s.loadingimg} src={Loading} alt="" />
          <div className={s.loadingtxt}>Loading</div>
        </div>
      )}
    </div>
  );
}
