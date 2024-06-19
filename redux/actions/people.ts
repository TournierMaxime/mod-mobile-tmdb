import {
  PeopleCareer,
  PeopleDetails,
  PeopleExternalIds,
} from "../../../../services/tmdb"
import { AppThunk } from "store"

export const PEOPLE_CAREER_REQUEST = "PEOPLE_CAREER_REQUEST"
export const PEOPLE_CAREER_SUCCESS = "PEOPLE_CAREER_SUCCESS"
export const PEOPLE_CAREER_FAILURE = "PEOPLE_CAREER_FAILURE"

interface PeopleCareerRequestAction {
  type: typeof PEOPLE_CAREER_REQUEST
}

interface PeopleCareerSuccessAction {
  type: typeof PEOPLE_CAREER_SUCCESS
  payload: any
}

interface PeopleCareerFailureAction {
  type: typeof PEOPLE_CAREER_FAILURE
  payload: string
}

export const PEOPLE_DETAILS_REQUEST = "PEOPLE_DETAILS_REQUEST"
export const PEOPLE_DETAILS_SUCCESS = "PEOPLE_DETAILS_SUCCESS"
export const PEOPLE_DETAILS_FAILURE = "PEOPLE_DETAILS_FAILURE"

interface PeopleDetailsRequestAction {
  type: typeof PEOPLE_DETAILS_REQUEST
}

interface PeopleDetailsSuccessAction {
  type: typeof PEOPLE_DETAILS_SUCCESS
  payload: any
}

interface PeopleDetailsFailureAction {
  type: typeof PEOPLE_DETAILS_FAILURE
  payload: string
}

export const PEOPLE_EXTERNAL_IDS_REQUEST = "PEOPLE_EXTERNAL_IDS_REQUEST"
export const PEOPLE_EXTERNAL_IDS_SUCCESS = "PEOPLE_EXTERNAL_IDS_SUCCESS"
export const PEOPLE_EXTERNAL_IDS_FAILURE = "PEOPLE_EXTERNAL_IDS_FAILURE"

interface PeopleExternalIdsRequestAction {
  type: typeof PEOPLE_EXTERNAL_IDS_REQUEST
}

interface PeopleExternalIdsSuccessAction {
  type: typeof PEOPLE_EXTERNAL_IDS_SUCCESS
  payload: any
}

interface PeopleExternalIdsFailureAction {
  type: typeof PEOPLE_EXTERNAL_IDS_FAILURE
  payload: string
}

export const RESET = "RESET"

interface ResetAction {
  type: typeof RESET
}

type PeopleActionTypes =
  | PeopleCareerRequestAction
  | PeopleCareerSuccessAction
  | PeopleCareerFailureAction
  | PeopleDetailsRequestAction
  | PeopleDetailsSuccessAction
  | PeopleDetailsFailureAction
  | PeopleExternalIdsRequestAction
  | PeopleExternalIdsSuccessAction
  | PeopleExternalIdsFailureAction
  | ResetAction

const peopleCareer =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: PEOPLE_CAREER_REQUEST })
      const response = await PeopleCareer(id, language)
      dispatch({
        type: PEOPLE_CAREER_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: PEOPLE_CAREER_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const peopleDetails =
  (id: number, language: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: PEOPLE_DETAILS_REQUEST })
      const response = await PeopleDetails(id, language)
      dispatch({
        type: PEOPLE_DETAILS_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: PEOPLE_DETAILS_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const peopleExternalIds =
  (id: number): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: PEOPLE_EXTERNAL_IDS_REQUEST })
      const response = await PeopleExternalIds(id)
      dispatch({
        type: PEOPLE_EXTERNAL_IDS_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: PEOPLE_EXTERNAL_IDS_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const reset = () => ({
  type: RESET,
})

export { peopleCareer, peopleDetails, peopleExternalIds, reset }

export type { PeopleActionTypes }
