import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk"
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';


const stringMiddleware = (store) => (next) => (action) => {//Делает то же самое, что и энхенсер, но работает напрямую с диспетчем а не сос тором
    if (typeof action === "string") {
        return next({
            type: action
        })
    }
    return next(action)
}

const enhancer = (createStore) => (...args) => {//Нужен, если вместо экшона в диспетч придет строка действия, вместо объекта
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === "string") {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }

    return store
}

const store = createStore(
    combineReducers({heroes, filters}),
    // compose(
    //     enhancer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),//Должно работать также как с энхенсером
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

)
export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()