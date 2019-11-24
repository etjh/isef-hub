import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJHInterface, defaultValue } from 'app/shared/model/jh-interface.model';

export const ACTION_TYPES = {
  FETCH_JHINTERFACE_LIST: 'jHInterface/FETCH_JHINTERFACE_LIST',
  FETCH_JHINTERFACE: 'jHInterface/FETCH_JHINTERFACE',
  CREATE_JHINTERFACE: 'jHInterface/CREATE_JHINTERFACE',
  UPDATE_JHINTERFACE: 'jHInterface/UPDATE_JHINTERFACE',
  DELETE_JHINTERFACE: 'jHInterface/DELETE_JHINTERFACE',
  RESET: 'jHInterface/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJHInterface>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type JHInterfaceState = Readonly<typeof initialState>;

// Reducer

export default (state: JHInterfaceState = initialState, action): JHInterfaceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JHINTERFACE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JHINTERFACE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JHINTERFACE):
    case REQUEST(ACTION_TYPES.UPDATE_JHINTERFACE):
    case REQUEST(ACTION_TYPES.DELETE_JHINTERFACE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JHINTERFACE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JHINTERFACE):
    case FAILURE(ACTION_TYPES.CREATE_JHINTERFACE):
    case FAILURE(ACTION_TYPES.UPDATE_JHINTERFACE):
    case FAILURE(ACTION_TYPES.DELETE_JHINTERFACE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JHINTERFACE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_JHINTERFACE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JHINTERFACE):
    case SUCCESS(ACTION_TYPES.UPDATE_JHINTERFACE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JHINTERFACE):
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

const apiUrl = 'api/jh-interfaces';

// Actions

export const getEntities: ICrudGetAllAction<IJHInterface> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JHINTERFACE_LIST,
    payload: axios.get<IJHInterface>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IJHInterface> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JHINTERFACE,
    payload: axios.get<IJHInterface>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJHInterface> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JHINTERFACE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IJHInterface> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JHINTERFACE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJHInterface> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JHINTERFACE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
