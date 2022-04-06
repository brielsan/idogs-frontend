import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestDogs, requestTemperaments } from "../../redux/dogs.actions";
import s from "./CreateRace.module.css";
import Nav from "../../components/Nav/Nav.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Temperaments from "./Temperaments/Temperaments.jsx";
import plus from "../../ico/plus.png";
import error from "../../ico/close.png";
import { useNavigate } from "react-router-dom";

export default function CreateRace() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let alldogs = useSelector((state) => state.alldogs);

  let temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(requestTemperaments());
    }
  }, [dispatch, temperaments]);

  const [listTemperament, setListTemperament] = useState("");

  const [dogTemperament, setdogTemperament] = useState([]);

  const [body, setBody] = useState({
    name: "",
    height: {
      min: "",
      max: "",
    },
    weight: {
      min: "",
      max: "",
    },
    life_span: {
      min: "",
      max: "",
    },
    image: {
      url: "",
    },
  });

  const onClose = (arg) => {
    setdogTemperament(dogTemperament.filter((el) => el !== arg));
  };

  const post = async (temperament) => {
    let dog = {
      ...body,
      name: body.name.trim(),
      temperament: temperament,
    };

    await fetch("https://idogsback.herokuapp.com/dog", {
      method: "POST",
      body: JSON.stringify(dog),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => window.alert("An error has occurred."))
      .then((response) => {
        dispatch(requestDogs());
        window.alert("The dog breed was successfully created.");
        return navigate("/home");
      });
  };

  const comprobation = async (temperament, name) => {
    let bo = true;

    for (var i = 0; i < alldogs.length; i++) {
      if (alldogs[i].name.toLowerCase() == name || alldogs[i].name.toLowerCase() == name.toLowerCase().trim()) {
        bo = false;
      }
    }

    if (bo == true) {
      return await post(temperament);
    } else {
      window.alert('The dog breed "' + name.trim() + '" already exists.');
    }
  };

  const addTemperament = () => {
    if (listTemperament == "")
      return window.alert("Please insert a temperament");

    if (dogTemperament.includes(listTemperament)) {
      setListTemperament("");
      return window.alert("You already added this temperament");
    }

    const find = temperaments.find((el) => el.name == listTemperament);

    if (find) {
      return (
        setdogTemperament([...dogTemperament, listTemperament]),
        setListTemperament("")
      );
    }
    setListTemperament("");
    window.alert("This temperament does not exist");
  };

  const allValidations =
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\d/?~]/.test(body.name) ||
    body.name.trim().length === 0 ||
    body.name.length < 3 ||
    body.name.length > 20 ||
    body.name.length == 0 ||
    body.height.min <= 0 ||
    body.height.max <= 0 ||
    body.life_span.min <= 0 ||
    body.life_span.max <= 0 ||
    dogTemperament.length < 3;

  const completeNums =
    !body.weight.min ||
    !body.weight.max ||
    !body.height.min ||
    !body.height.max ||
    !body.life_span.min ||
    !body.life_span.max;

  const lengthMinMax =
    body.height.min.length > 0 &&
    body.height.max.length > 0 &&
    body.weight.min.length > 0 &&
    body.weight.max.length > 0 &&
    body.life_span.min.length > 0 &&
    body.life_span.max.length > 0;

  const minMax =
    Number(body.height.min) > Number(body.height.max) ||
    Number(body.weight.min) > Number(body.weight.max) ||
    Number(body.life_span.min) > Number(body.life_span.max);

  return (
    <div className={s.root}>
      <Nav />
      <div className={s.f}>
        <div className={s.container}>
          <div className={s.title}>Create new race</div>
          <div className={s.inputs}>
            <div className={s.input}>
              <input
                autocomplete="off"
                placeholder="Name"
                value={body.name}
                onChange={(e) => setBody({ ...body, name: e.target.value })}
              />
            </div>
            <div
              className={
                /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(body.name)
                  ? s.text
                  : s.off
              }
            >
              <img width="15px" src={error} alt="" />
              <span style={{ fontSize: "12px" }}>
                The name cannot contain numbers or symbols
              </span>
            </div>
            <div
              className={
                body.name.length < 3 ||
                body.name.length > 20 ||
                body.name.trim().length === 0
                  ? s.text
                  : s.off
              }
            >
              <img width="15px" src={error} alt="" />
              <span style={{ fontSize: "12px" }}>
                The name must have more than 3 characters and less than 20
                characters
              </span>
            </div>
            <div className={s.inputdoble}>
              <div className={s.inputprimero}>
                <input
                  autocomplete="off"
                  placeholder="Min-Height"
                  value={body.height.min}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      height: { ...body.height, min: e.target.value.replace() },
                    })
                  }
                />
              </div>
              <div className={s.inputsegundo}>
                <input
                  autocomplete="off"
                  placeholder="Max-Height"
                  value={body.height.max}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      height: { ...body.height, max: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className={s.inputdoble}>
              <div className={s.inputprimero}>
                <input
                  autocomplete="off"
                  placeholder="Min-Weight"
                  value={body.weight.min}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      weight: { ...body.weight, min: e.target.value },
                    })
                  }
                />
              </div>
              <div className={s.inputsegundo}>
                <input
                  autocomplete="off"
                  placeholder="Max-Weight"
                  value={body.weight.max}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      weight: { ...body.weight, max: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div className={s.inputdoble}>
              <div className={s.inputprimero}>
                <input
                  autocomplete="off"
                  placeholder="Min-Life span"
                  value={body.life_span.min}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      life_span: { ...body.life_span, min: e.target.value },
                    })
                  }
                />
              </div>
              <div className={s.inputsegundo}>
                <input
                  autocomplete="off"
                  placeholder="Max-Life span"
                  value={body.life_span.max}
                  type="number"
                  onChange={(e) =>
                    setBody({
                      ...body,
                      life_span: { ...body.life_span, max: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <span
              style={
                completeNums
                  ? { fontSize: "12px", marginTop: "-8px" }
                  : { display: "none" }
              }
            >
              *Weight, height, and life expectancy must be numerical values.
            </span>
            <span
              style={
                minMax && lengthMinMax
                  ? { fontSize: "12px", marginTop: "-8px" }
                  : { display: "none" }
              }
              className={s.text}
            >
              <img width="15px" src={error} alt="" />
              The minimum values must be less than the maximum values
            </span>
            <div className={s.input}>
              <input
                autocomplete="off"
                placeholder="Image URL"
                value={body.image.url}
                onChange={(e) =>
                  setBody({ ...body, image: { url: e.target.value } })
                }
              />
            </div>
            <span
              style={
                !body.image.url.length > 0
                  ? { fontSize: "12px", marginTop: "-8px" }
                  : { display: "none" }
              }
            >
              *If the image url is not filled, a default image will be used.
            </span>
            <div className={s.addcontainer}>
              <input
                value={listTemperament}
                placeholder="Temperament"
                list="temperaments"
                onChange={(e) => setListTemperament(e.target.value)}
              />
              <datalist id="temperaments">
                {temperaments.map((el) => (
                  <option value={el.name} />
                ))}
              </datalist>
              <img
                alt=""
                src={plus}
                className={dogTemperament.length < 6 ? s.add : s.off}
                onClick={addTemperament}
              />
            </div>
            <span
              style={
                dogTemperament.length < 3
                  ? { fontSize: "12px", marginTop: "-8px" }
                  : { display: "none" }
              }
            >
              *A minimum of 3 temperaments is required.
            </span>
            <span
              style={
                dogTemperament.length === 6
                  ? { fontSize: "12px", marginTop: "-8px" }
                  : { display: "none" }
              }
            >
              *No more temperaments can be added.
            </span>
            <div className={s.btnpc}>
              <button
                disabled={allValidations}
                className={s.btn}
                onClick={() => comprobation(dogTemperament, body.name)}
              >
                POST
              </button>
            </div>
          </div>
        </div>

        <div className={s.right}>
          <Temperaments temperaments={dogTemperament} onClose={onClose} />
          <div className={s.btnmobile}>
            <button
              disabled={allValidations}
              className={s.btn}
              onClick={() => comprobation(dogTemperament, body.name)}
            >
              POST
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
