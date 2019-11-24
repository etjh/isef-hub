import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISolution, defaultValue } from 'app/shared/model/solution.model';

export const ACTION_TYPES = {
  FETCH_SOLUTION_LIST: 'solution/FETCH_SOLUTION_LIST',
  FETCH_SOLUTION: 'solution/FETCH_SOLUTION',
  CREATE_SOLUTION: 'solution/CREATE_SOLUTION',
  UPDATE_SOLUTION: 'solution/UPDATE_SOLUTION',
  DELETE_SOLUTION: 'solution/DELETE_SOLUTION',
  RESET: 'solution/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISolution>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SolutionState = Readonly<typeof initialState>;

// Reducer

export default (state: SolutionState = initialState, action): SolutionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SOLUTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SOLUTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SOLUTION):
    case REQUEST(ACTION_TYPES.UPDATE_SOLUTION):
    case REQUEST(ACTION_TYPES.DELETE_SOLUTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SOLUTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SOLUTION):
    case FAILURE(ACTION_TYPES.CREATE_SOLUTION):
    case FAILURE(ACTION_TYPES.UPDATE_SOLUTION):
    case FAILURE(ACTION_TYPES.DELETE_SOLUTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOLUTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOLUTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SOLUTION):
    case SUCCESS(ACTION_TYPES.UPDATE_SOLUTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SOLUTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/solutions';

// Actions

export const getEntities: ICrudGetAllAction<ISolution> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SOLUTION_LIST,
  payload: axios.get<ISolution>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISolution> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SOLUTION,
    payload: axios.get<ISolution>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISolution> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SOLUTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISolution> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SOLUTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISolution> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SOLUTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
