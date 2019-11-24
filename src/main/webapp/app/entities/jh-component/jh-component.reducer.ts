import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJHComponent, defaultValue } from 'app/shared/model/jh-component.model';

export const ACTION_TYPES = {
  FETCH_JHCOMPONENT_LIST: 'jHComponent/FETCH_JHCOMPONENT_LIST',
  FETCH_JHCOMPONENT: 'jHComponent/FETCH_JHCOMPONENT',
  CREATE_JHCOMPONENT: 'jHComponent/CREATE_JHCOMPONENT',
  UPDATE_JHCOMPONENT: 'jHComponent/UPDATE_JHCOMPONENT',
  DELETE_JHCOMPONENT: 'jHComponent/DELETE_JHCOMPONENT',
  RESET: 'jHComponent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJHComponent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JHComponentState = Readonly<typeof initialState>;

// Reducer

export default (state: JHComponentState = initialState, action): JHComponentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JHCOMPONENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JHCOMPONENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JHCOMPONENT):
    case REQUEST(ACTION_TYPES.UPDATE_JHCOMPONENT):
    case REQUEST(ACTION_TYPES.DELETE_JHCOMPONENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JHCOMPONENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JHCOMPONENT):
    case FAILURE(ACTION_TYPES.CREATE_JHCOMPONENT):
    case FAILURE(ACTION_TYPES.UPDATE_JHCOMPONENT):
    case FAILURE(ACTION_TYPES.DELETE_JHCOMPONENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHCOMPONENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHCOMPONENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JHCOMPONENT):
    case SUCCESS(ACTION_TYPES.UPDATE_JHCOMPONENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JHCOMPONENT):
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

const apiUrl = 'api/jh-components';

// Actions

export const getEntities: ICrudGetAllAction<IJHComponent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JHCOMPONENT_LIST,
  payload: axios.get<IJHComponent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJHComponent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JHCOMPONENT,
    payload: axios.get<IJHComponent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJHComponent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JHCOMPONENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJHComponent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JHCOMPONENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJHComponent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JHCOMPONENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
