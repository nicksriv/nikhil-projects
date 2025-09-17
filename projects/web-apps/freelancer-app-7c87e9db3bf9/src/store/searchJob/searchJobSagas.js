import { call, put, takeLatest } from "@redux-saga/core/effects";

import { searchJobConstants } from "./searchJobConstants";
import { searchJobApis } from "./searchJobApis";
import { searchJobParser } from "./searchJobParsers";
import { asyncStorage } from "../asyncStorage";

function* searchJobSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.SEARCH_JOB_REQUEST });
    const res = yield call(searchJobApis.getSearchJob, payload);
    const parsedData = searchJobParser.jobList(res);
    yield put({
      type: searchJobConstants.SEARCH_JOB_RESPONSE,
      payload: parsedData,
      requestPayload: payload,
    });
  } catch (error) {
    yield put({
      type: searchJobConstants.SEARCH_JOB_RESPONSE,
      payload: [],
      requestPayload: payload,
    });
    console.error(`Action ${type} failed with `, error);
  }
}

function* searchJobDescriptionSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.SEARCH_JOB_DESCRIPTION_REQUEST });
    const res = yield call(searchJobApis.getSearchJobDescription, payload);
    const data = searchJobParser.jobDetails(res);

    yield put({
      type: searchJobConstants.SEARCH_JOB_DESCRIPTION_RESPONSE,
      payload: data,
    });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

function* applyJobSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.APPLY_JOB_REQUEST });
    const res = yield call(searchJobApis.applyJob, payload);

    yield put({
      type: searchJobConstants.APPLY_JOB_RESPONSE,
    });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

function* similarJobSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.SIMILAR_JOB_REQUEST });
    const res = yield call(searchJobApis.getSimilarJob, payload);
    const data = searchJobParser.jobList(res);
    yield put({ type: searchJobConstants.SIMILAR_JOB_RESPONSE, payload: data });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

function* otherOpeningJobSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.OTHER_OPENING_JOB_REQUEST });
    const res = yield call(searchJobApis.getOtherOpeningJob, payload);
    const data = searchJobParser.jobList(res);
    yield put({
      type: searchJobConstants.OTHER_OPENING_JOB_RESPONSE,
      payload: data,
    });
  } catch (error) {
    console.error(`Action ${type} failed with `, error);
  }
}

function* skillsSaga({ type, payload }) {
  try {
    yield put({ type: searchJobConstants.SKILLS_REQUEST });
    const res = yield call(searchJobApis.getSkills, payload);
    const parsedData = searchJobParser.skillsListParser(res);
    yield put({
      type: searchJobConstants.SKILLS_RESPONSE,
      payload: parsedData,
    });
  } catch (error) {
    yield put({ type: searchJobConstants.SKILLS_RESPONSE, payload: [] });
    console.error(`Action ${type} failed with `, error);
  }
}
function* skillCategoriesSaga({ type }) {
  try {
    yield put({ type: searchJobConstants.SKILL_CATEGORIES_REQUEST });
    const res = yield call(searchJobApis.getSkillsCategories);
    const payload = searchJobParser.skillsListCategoriesParser(res);
    yield put({ type: searchJobConstants.SKILL_CATEGORIES_RESPONSE, payload });
  } catch (error) {
    yield put({
      type: searchJobConstants.SKILL_CATEGORIES_RESPONSE,
      payload: [],
    });
    console.error(`Action ${type} failed with `, error);
  }
}

export function* registerSearchJobSagas() {
  yield takeLatest(searchJobConstants.SEARCH_JOB_SAGA, searchJobSaga);
  yield takeLatest(
    searchJobConstants.SEARCH_JOB_DESCRIPTION_SAGA,
    searchJobDescriptionSaga
  );
  yield takeLatest(searchJobConstants.APPLY_JOB_SAGA, applyJobSaga);
  yield takeLatest(searchJobConstants.SIMILAR_JOB_SAGA, similarJobSaga);
  yield takeLatest(
    searchJobConstants.OTHER_OPENING_JOB_SAGA,
    otherOpeningJobSaga
  );
  yield takeLatest(searchJobConstants.SKILLS_SAGA, skillsSaga);
  yield takeLatest(
    searchJobConstants.SKILL_CATEGORIES_SAGA,
    skillCategoriesSaga
  );
}
