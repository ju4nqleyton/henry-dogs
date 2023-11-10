import axios from 'axios';
import {
  GET_DOGS,
  GET_BY_NAME,
  GET_BY_ID,
  CREATE_DOG_SUCCESS,
  CREATE_DOG_FAILURE,
  FETCH_TEMPERAMENTS_SUCCESS,
  FETCH_TEMPERAMENTS_FAILURE,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  CLEAR,
} from './types';

const URL = 'http://localhost:3001';

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/dogs`);
    return dispatch({
      type: GET_DOGS,
      payload: response.data,
    });
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/dogs/name?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
}

export function getDogById(id) {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/dogs/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: response.data,
    });
  };
}

export function createADog(dog) {
  return async function (dispatch) {
    try {
      const { name, image, height, weight, life_span } = dog;

      if (!name || !image || !height || !weight || !life_span) {
        throw new Error('All fields are required');
      }

      const response = await axios.post(`${URL}/dogs`, dog);

      dispatch({
        type: CREATE_DOG_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_DOG_FAILURE,
        payload: error.message,
      });
    }
  };
}

export const fetchTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/temperaments`);
    dispatch({
      type: FETCH_TEMPERAMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TEMPERAMENTS_FAILURE,
      payload: error.message,
    });
  }
};

export function filterByTemperament(temperament) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament,
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function sortByName(sort) {
  return {
    type: SORT_BY_NAME,
    payload: sort,
  };
}

export function sortByWeight(sort) {
  return {
    type: SORT_BY_WEIGHT,
    payload: sort,
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}
