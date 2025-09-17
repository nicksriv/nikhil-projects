import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
} from 'redux-persist'; // this is for debugging with React-Native
import LoaderReducer from "../Reducers/LoaderReducer";
import ListReducer from "../Reducers/ListReducer";
import AuthReducr from "../Reducers/AuthReducr";
import ValidationReducer from "../Reducers/ValidationReducer";
import ErrorReducer from "../Reducers/ErrorReducer";
import { Config } from '../../constants/Config';

 const dynamicModuleReducer = combineReducers({
  loader: LoaderReducer,
  tablelist: ListReducer,
  validationReducer: ValidationReducer,
  auth: AuthReducr,
  error: ErrorReducer
});

export default dynamicModuleReducer



// const persistConfig = {
//   key: Config.PERSIST_ROOT_STORAGE,
//   storage: AsyncStorage,
//   whitelist: Config.PERSIST_DATA,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store =
//    createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// let persistor = persistStore(store);

// export { store, persistor };
