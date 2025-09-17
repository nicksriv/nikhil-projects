import React from 'react'
import { Provider, useSelector } from "react-redux";
import store from "./src/store/";

const AppHOC = (children) => {
  return (
    <>
        <Provider store={store}>
            {children}
        </Provider>
    </>
  )
}

export default AppHOC