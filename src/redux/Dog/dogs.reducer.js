import {
  REQUEST_DOGS,
  SEARCH_DOGS,
  REQUEST_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
  FILTER_API_DB,
  ORDER,
  FILTER_TEMPERAMENT_DELETE,
  SET_DOG_DETAIL,
  CLEAR_DETAIL,
} from "../dogs.type";

const INITIAL_STATE = {
  alldogs: [],
  dogs: [],
  temperaments: [],
  searchdogs: [],
  orderFilter: {
    order: "all",
    filter: "all",
  },
  tempDogsFilter: [],
  dogDetail: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_DOGS:
      return {
        ...state,
        alldogs: action.payload,
        dogs: action.payload,
      };

    case SEARCH_DOGS:
      return {
        ...state,
        searchdogs: action.payload,
      };

    case REQUEST_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case ORDER:
      let sort = [];
      let order = action.payload;
      if (order == "all")
        return {
          ...state,
        };
      if (order == "asc") {
        sort = state.dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (order == "desc") {
        sort = state.dogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (order == "ascweight") {
        sort = state.dogs.sort(
          (a, b) =>
            a.weight.metric.replace(/ /g, "").split("-")[1] -
            b.weight.metric.replace(/ /g, "").split("-")[1]
        );
      }
      if (order == "descweight") {
        sort = state.dogs.sort(
          (a, b) =>
            b.weight.metric.replace(/ /g, "").split("-")[1] -
            a.weight.metric.replace(/ /g, "").split("-")[1]
        );
      }
      return {
        ...state,
        dogs: sort,
        orderFilter: {
          ...state.orderFilter,
          order: order,
        },
      };

    case FILTER_API_DB:
      let dogsToFilter = state.tempDogsFilter;

      dogsToFilter = dogsToFilter[dogsToFilter.length - 1];

      if (state.tempDogsFilter.length == 0) dogsToFilter = state.alldogs;

      let filter;

      if (action.payload == "all") {
        filter = dogsToFilter;
      }
      if (action.payload == "api") {
        filter = dogsToFilter.filter((el) => el.createdByDB === false);
      }
      if (action.payload == "db") {
        filter = dogsToFilter.filter((el) => el.createdByDB === true);
      }
      return {
        ...state,
        dogs: filter,
        orderFilter: {
          ...state.orderFilter,
          filter: action.payload,
        },
        tempDogsFilter: action.condition === true ? [] : state.tempDogsFilter,
      };
    case FILTER_TEMPERAMENT:
      let temperament = action.payload;

      let dogs = state.dogs;

      let actualDogsFilter = dogs.filter((el) => {
        return el.temperament.find((el2) => el2.name == temperament);
      });

      return {
        ...state,
        dogs: [...actualDogsFilter],
        tempDogsFilter: [...state.tempDogsFilter, actualDogsFilter],
      };

    case FILTER_TEMPERAMENT_DELETE:
      let actualTempDelete = state.tempDogsFilter;

      if (actualTempDelete.length <= 1) {
        return {
          ...state,
          dogs: state.alldogs,
          tempDogsFilter: [],
        };
      } else {
        actualTempDelete.pop();
      }

      return {
        ...state,
        dogs: [...actualTempDelete[actualTempDelete.length - 1]],
        tempDogsFilter: [...actualTempDelete],
      };

    case SET_DOG_DETAIL:
      let dogDetail = action.payload[0];
      return {
        ...state,
        dogDetail,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        dogDetail: {},
      };
    default:
      return state;
  }
};

export default reducer;
