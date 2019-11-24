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

import { IIssue, defaultValue } from 'app/shared/model/issue.model';

export const ACTION_TYPES = {
  FETCH_ISSUE_LIST: 'issue/FETCH_ISSUE_LIST',
  FETCH_ISSUE: 'issue/FETCH_ISSUE',
  CREATE_ISSUE: 'issue/CREATE_ISSUE',
  UPDATE_ISSUE: 'issue/UPDATE_ISSUE',
  DELETE_ISSUE: 'issue/DELETE_ISSUE',
  RESET: 'issue/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIssue>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IssueState = Readonly<typeof initialState>;

// Reducer

export default (state: IssueState = initialState, action): IssueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ISSUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ISSUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ISSUE):
    case REQUEST(ACTION_TYPES.UPDATE_ISSUE):
    case REQUEST(ACTION_TYPES.DELETE_ISSUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ISSUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ISSUE):
    case FAILURE(ACTION_TYPES.CREATE_ISSUE):
    case FAILURE(ACTION_TYPES.UPDATE_ISSUE):
    case FAILURE(ACTION_TYPES.DELETE_ISSUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ISSUE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_ISSUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ISSUE):
    case SUCCESS(ACTION_TYPES.UPDATE_ISSUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ISSUE):
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

const apiUrl = 'api/issues';

// Actions

export const getEntities: ICrudGetAllAction<IIssue> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ISSUE_LIST,
    payload: axios.get<IIssue>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IIssue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ISSUE,
    payload: axios.get<IIssue>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIssue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ISSUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IIssue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ISSUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIssue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ISSUE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
