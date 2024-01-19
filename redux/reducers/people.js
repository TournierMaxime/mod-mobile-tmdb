const initialState = {
  data: [],
  loading: false,
  error: null,
}

const peopleCareerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_CAREER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'PEOPLE_CAREER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'PEOPLE_CAREER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_PEOPLE_CAREER':
      return initialState
    default:
      return state
  }
}

const detailsPeopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'PEOPLE_DETAILS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'PEOPLE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_PEOPLE_DETAILS':
      return initialState
    default:
      return state
  }
}

const peopleExternalIdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PEOPLE_EXTERNAL_IDS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'PEOPLE_EXTERNAL_IDS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case 'PEOPLE_EXTERNAL_IDS_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_PEOPLE_EXTERNAL_IDS':
      return initialState
    default:
      return state
  }
}

export { peopleCareerReducer, detailsPeopleReducer, peopleExternalIdsReducer }
