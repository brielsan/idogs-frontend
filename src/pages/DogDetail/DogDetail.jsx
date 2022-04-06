import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import s from "./DogDetail.module.css";
import loading from "../../img/loading.gif";
import back from "../../ico/back.png";
import { clearDetail, setDogDetail } from "../../redux/dogs.actions.js";

export default function DogDetail() {
  const { name } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDogDetail(name));
  }, [dispatch, name]);

  //// clearDetail || ComponentDidMount

  useEffect(
    () => () => {
      dispatch(clearDetail());
    },
    [dispatch]
  );

  ////////////////

  let temperament = "";

  let dog = useSelector((state) => state.dogDetail);

  dog.temperament?.forEach((el) => (temperament += el.name + ", "));

  return (
    <div className={s.root}>
      <Nav />
      <div className={s.card}>
        <img
          className={!dog.hasOwnProperty("image") ? s.loading : s.off}
          src={loading}
          alt=""
        />

        <div className={dog.hasOwnProperty("image") ? s.back : s.off}>
          <Link to="/home">
            <img src={back} alt="" className={s.backimg} />
          </Link>
        </div>

        <div className={dog.hasOwnProperty("image") ? s.ambos : s.off}>
          <div className={s.izq}>
            <div className={s.imgDog}>
              <img
                className={s.img}
                alt=""
                src={dog.image?.url}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://i.insider.com/5ef54cb61918242cfb4ec653?width=700";
                }}
              />
            </div>
          </div>
          <div className={s.der}>
            <div className={s.text}>Name: {dog.name}</div>
            <div className={s.text}>
              Temperament: {temperament.substring(0, temperament.length - 2)}
            </div>
            <div className={s.text}>Weight: {dog.weight?.metric}kg</div>
            <div className={s.text}>Height: {dog.height?.metric}cm</div>
            <div className={s.text}>Life-Span: {dog.life_span}</div>
            <div className={s.imgbackcontainer}>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://i.insider.com/5ef54cb61918242cfb4ec653?width=700";
                }}
                className={s.imgback}
                alt=""
                src={dog.image?.url}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
