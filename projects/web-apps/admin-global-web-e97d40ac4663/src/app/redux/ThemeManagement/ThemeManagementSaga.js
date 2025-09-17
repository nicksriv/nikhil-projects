import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from './../slices/snackbar';
import { getThemeConfigService, setThemeConfigService } from './ThemeManagementService';
import { setScreenPrimaryColor, setScreenMenuColor, setScreenFontStyle, setInitialState, setDefaultStyles } from './ThemeManagementSlice'

function* setPrimaryColor(payload) {
    try {
        yield put(setScreenPrimaryColor(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setMenuColor(payload) {
    try {
        yield put(setScreenMenuColor(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* setFontStyle(payload) {
    try {
        yield put(setScreenFontStyle(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* setThemeConfiguration(payload) {
    try {
        const response = yield call(setThemeConfigService, payload.payload);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
function* getThemeConfiguration(payload) {
    try {
        const { clientId } = payload;
        const response = yield call(getThemeConfigService, clientId);
        yield put(setInitialState(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* resetThemeConfiguration(payload) {
    try {
        yield put(setDefaultStyles(payload));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

function* watchSetPrimaryColor() {
    yield takeEvery('setPrimaryColorAction', setPrimaryColor);
}
function* watchSetMenuColor() {
    yield takeEvery('setMenuColorAction', setMenuColor);
}
function* watchSetFontStyle() {
    yield takeEvery('setFontStyleAction', setFontStyle);
}
function* watchSetThemeConfiguration() {
    yield takeEvery('setThemeConfigurationAction', setThemeConfiguration)
}
function* watchGetThemeConfiguration() {
    yield takeEvery('getThemeConfigurationAction', getThemeConfiguration)
}
function* watchResetThemeConfiguration() {
    yield takeEvery('resetThemeConfigurationAction', resetThemeConfiguration)
}
// Actions
export default function* themeManagementSaga() {
    yield all([
        watchSetPrimaryColor(),
        watchSetMenuColor(),
        watchSetFontStyle(),
        watchSetThemeConfiguration(),
        watchGetThemeConfiguration(),
        watchResetThemeConfiguration()
    ])
}