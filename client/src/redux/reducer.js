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

const initialState = {
  allDogs: [],
  allDogsCopy: [],
  dog: [],
  temperaments: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: payload,
        allDogsCopy: payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allDogs: payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        dog: payload,
      };
    case CREATE_DOG_SUCCESS:
      return {
        ...state,
        allDogs: [...state.allDogs, payload],
        allDogsCopy: [...state.allDogsCopy, payload],
      };
    case FETCH_TEMPERAMENTS_SUCCESS:
      return {
        ...state,
        temperaments: payload,
      };
    case FETCH_TEMPERAMENTS_FAILURE:
      return state;
    case CREATE_DOG_FAILURE:
      return state;
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        allDogs: state.allDogs.filter((dogs) =>
          dogs.temperament?.includes(payload)
        ),
      };
    case FILTER_BY_ORIGIN:
      if (payload === 'api') {
        return {
          ...state,
          allDogs: state.allDogs.filter((dog) => dog.id.toString().length <= 3),
        };
      } else if (payload === 'database') {
        return {
          ...state,
          allDogs: state.allDogs.filter((dog) => dog.id.toString().length > 3),
        };
      } else {
        return state;
      }
    case SORT_BY_NAME:
      if (payload === 'asc') {
        return {
          ...state,
          allDogs: [...state.allDogs].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      } else if (payload === 'desc') {
        return {
          ...state,
          allDogs: [...state.allDogs].sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      } else {
        return state;
      }
    case SORT_BY_WEIGHT:
      if (payload === 'asc') {
        return {
          ...state,
          allDogs: [...state.allDogs].sort((a, b) => {
            const maxWeightA = Math.max(...a.weight.split(' - '));
            const maxWeightB = Math.max(...b.weight.split(' - '));
            return maxWeightA - maxWeightB;
          }),
        };
      } else if (payload === 'desc') {
        return {
          ...state,
          allDogs: [...state.allDogs].sort((a, b) => {
            const maxWeightA = Math.max(...a.weight.split(' - '));
            const maxWeightB = Math.max(...b.weight.split(' - '));
            return maxWeightB - maxWeightA;
          }),
        };
      } else {
        return state;
      }
    case CLEAR:
      return {
        ...state,
        allDogs: state.allDogsCopy,
      };
    default:
      return state;
  }
};

export default reducer;
