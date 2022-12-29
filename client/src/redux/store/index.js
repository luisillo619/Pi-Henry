import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";

//PARA QUE SE PUEDA USAR LA EXTENCION DE REDUX
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// middleware para usar asincronia en redux
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;