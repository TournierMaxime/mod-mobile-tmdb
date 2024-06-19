import {
  PEOPLE_CAREER_FAILURE,
  PEOPLE_CAREER_REQUEST,
  PEOPLE_CAREER_SUCCESS,
  PEOPLE_DETAILS_FAILURE,
  PEOPLE_DETAILS_REQUEST,
  PEOPLE_DETAILS_SUCCESS,
  PEOPLE_EXTERNAL_IDS_FAILURE,
  PEOPLE_EXTERNAL_IDS_REQUEST,
  PEOPLE_EXTERNAL_IDS_SUCCESS,
  RESET,
  PeopleActionTypes,
} from "../actions/people"

interface PeopleState {
  data: []
  loading: boolean
  error: string | null
}

const initialState: PeopleState = {
  data: [],
  loading: false,
  error: null,
}

const peopleCareerReducer = (
  state = initialState,
  action: PeopleActionTypes,
): PeopleState => {
  switch (action.type) {
    case PEOPLE_CAREER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case PEOPLE_CAREER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case PEOPLE_CAREER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const detailsPeopleReducer = (
  state = initialState,
  action: PeopleActionTypes,
): PeopleState => {
  switch (action.type) {
    case PEOPLE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case PEOPLE_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case PEOPLE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

const peopleExternalIdsReducer = (
  state = initialState,
  action: PeopleActionTypes,
): PeopleState => {
  switch (action.type) {
    case PEOPLE_EXTERNAL_IDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case PEOPLE_EXTERNAL_IDS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case PEOPLE_EXTERNAL_IDS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export { peopleCareerReducer, detailsPeopleReducer, peopleExternalIdsReducer }
