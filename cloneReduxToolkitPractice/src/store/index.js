
import { configureStore } from "@reduxjs/toolkit";
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';


const stringMiddleware = (store) => (next) => (action) => {//Делает то же самое, что и энхенсер, но работает напрямую с диспетчем а не сос тором
    if (typeof action === "string") {
        return next({
            type: action
        })
    }
    return next(action)
}


const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),//Уже включены три мидлвеер
    devTools: process.env.NODE_ENV !== "production",
})


// const store = createStore(
//     combineReducers({heroes, filters}),
//     // compose(
//     //     enhancer,
//     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleware),//Должно работать также как с энхенсером
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

// )
export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()