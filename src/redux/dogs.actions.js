import {
  REQUEST_DOGS,
  SET_DOG_DETAIL,
  REQUEST_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
  FILTER_TEMPERAMENT_DELETE,
  FILTER_API_DB,
  ORDER,
  CLEAR_DETAIL,
} from "./dogs.type";

export const requestDogs = () => {
  return async function (dispatch) {
    await fetch("https://idogsback.herokuapp.com/dogs")
      .then((response) => response.json())
      .then((data) => dispatch({ type: REQUEST_DOGS, payload: data }));
  };
};

export const requestTemperaments = () => {
  return async function (dispatch) {
    await fetch("https://idogsback.herokuapp.com/temperament")
      .then((response) => response.json())
      .then((data) => dispatch({ type: REQUEST_TEMPERAMENTS, payload: data }));
  };
};

export const filterTemperament = (payload) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload,
  };
};

export const filterTemperamentDelete = (payload) => {
  return {
    type: FILTER_TEMPERAMENT_DELETE,
    payload,
  };
};

export const filterApiDB = (payload, condition) => {
  return {
    type: FILTER_API_DB,
    payload,
    condition,
  };
};

export const order = (payload) => {
  return {
    type: ORDER,
    payload,
  };
};

export const setDogDetail = (name) => {
  return async function (dispatch) {
    fetch(`https://idogsback.herokuapp.com/dogs?name=${name}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: SET_DOG_DETAIL, payload: data }));
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};
